import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
}

interface GoogleBooksApiResponse {
  items: GoogleBookItem[];
}

interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

// TODO: Add caching for the search term
async function searchBooks(searchTerm: string): Promise<Book[]> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Books API key is not defined in .env file");
  }

  try {
    const response = await axios.get<GoogleBooksApiResponse>(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: searchTerm,
          orderBy: "relevance",
          key: apiKey,
        },
      },
    );

    const books: Book[] = response.data.items.map((item: GoogleBookItem) => ({
      id: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      author: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(", ")
        : "Unknown Author",
      imageUrl: item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : "",
    }));

    return books;
  } catch (error) {
    console.error("Error fetching data from Google Books API:", error);
    throw error;
  }
}

export default searchBooks;
