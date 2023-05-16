require("dotenv").config();

const accessKey = process.env.ACCESS_KEY_UNSPLASH;

const searchPhotos = async (query, orderBy) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=10`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    const data = await response.json();

    // Extract regular quality URLs from the response data
    const photos = data.results;
    const photoURLs = photos.map((photo) => photo.urls.regular);
    console.log(photoURLs);
  } catch (error) {
    console.error("Error:", error);
  }
};

searchPhotos("Amsterdam");
// searchPhotos("Rio de Janeiro", "popular"); // Retrieve best-rated pictures
