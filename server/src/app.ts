import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { setupScreenshotJob, latestScreenshotPath, folderPath } from './getScreenshotJob';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  return res.json({
    status: 'okay',
  });
});

// Get all already saved screenshots
app.get('/screenshots', async (req: Request, res: Response) => {
  try {
    const files = await fs.promises.readdir(folderPath);

    const screenshots = await Promise.all(files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const buffer = await fs.promises.readFile(filePath);
      const base64 = buffer.toString('base64');
      return {
        name: file,
        base64: `data:image/png;base64,${base64}`,
      };
    }));

    res.json(screenshots);
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    res.status(500).send('Error fetching screenshots');
  }
});

app.get('/latest-screenshot', (req: Request, res: Response) => {
  if (latestScreenshotPath) {
    res.attachment(latestScreenshotPath);
    res.sendFile(latestScreenshotPath);
  } else {
    res.status(404).send('No screenshot available');
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');

  if (latestScreenshotPath) {
    const screenshotBuffer = fs.readFileSync(folderPath + latestScreenshotPath);
    io.emit('latestScreenshot', {
      name: latestScreenshotPath,
      base64: `data:image/png;base64,${screenshotBuffer.toString('base64')}`
    });
  }
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Route failed for %s', req.url, { error });

  let errorMessage = 'General Error Occurred!';
  if (error.message) {
    errorMessage = error.message;
  }

  res.status(500).send(errorMessage);
});

// For local development, set the port to 4000
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

// Run the screenshot function every 20 seconds
const interval = 20000;
setupScreenshotJob(io, interval);

// Start the server
server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
