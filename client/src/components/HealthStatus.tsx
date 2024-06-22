import { useEffect, useState } from "react";

export default function HealthStatus() {
  const [healthStatus, setHealthStatus] = useState("loading");

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(`/api/health`);
      const healthStatus = await resp.json();
      setHealthStatus(healthStatus.status);
    }

    fetchData();
  }, []);

  return <div>hello, the health status - {healthStatus}</div>;
}
