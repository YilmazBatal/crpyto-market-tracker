const baseURL = "https://api.coingecko.com/api/v3";

export async function FetchGlobalData(): Promise<any> {
  try {
    const response = await fetch(`${baseURL}/global`, {next : {revalidate : 3600}} );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const result = await response.json();
    console.log("RESULT : !!!! " + result);
    

    // Check if `data` exists in the response
    if (!result.data) {
      throw new Error("API response does not contain `data` property.");
    }

    return result.data; // Return the actual global data
  } catch (error) {
    console.error("Failed to fetch global data:", error);
    return null; // Ensure null is returned if there's an error
  }
}

export async function CurrencyData(): Promise<any> {
  try {
    const response = await fetch(`${baseURL}/coins`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result) {
      throw new Error("API response is empty or invalid.");
    }

    return result; // Adjust based on the actual API structure
  } catch (error) {
    console.error("Failed to fetch currency data:", error);
    return null;
  }
}
