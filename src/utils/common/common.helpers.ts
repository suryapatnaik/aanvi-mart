// Get plus code from coordinates
export async function getPlusCode(latitude: number, longitude: number): Promise<string> {
  const plusCodeRes = await fetch(
    `https://plus.codes/api?address=${latitude},${longitude}`
  );
  const plusCodeData = await plusCodeRes.json();
  return plusCodeData.global_code || "";
}

// Get address from coordinates
export async function getAddress(latitude: number, longitude: number): Promise<string> {
  const addressRes = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );
  const addressData = await addressRes.json();
  let display = addressData.display_name || "Unknown location";
  if (display.length > 30) display = display.slice(0, 30) + "...";
  return display;
}

// Get current position and return [plusCode, address] or error string
export async function fetchLocationDetails(): Promise<{ plusCode: string; address: string } | { error: string }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: "Geolocation not supported" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const [plusCode, address] = await Promise.all([
            getPlusCode(latitude, longitude),
            getAddress(latitude, longitude),
          ]);
          resolve({ plusCode, address });
        } catch {
          resolve({ error: "Unable to fetch location" });
        }
      },
      () => resolve({ error: "Permission denied" })
    );
  });
}