// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { apiClient } from '../utils/api';
// import Spinner from '../components/Spinner';

// const BookDetails = () => {
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await apiClient.get(`/books/${id}`);
//         setBook(response.data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//         navigate('/'); // Redirect to home or show an error message
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookDetails();
//   }, [id, navigate]);

//   if (loading) {
//     return <Spinner />;
//   }

//   if (!book) {
//     return <div>Book not found</div>;
//   }

//   return (
//     <div>
//       <h1>{book.title}</h1>
//       <p>Author: {book.author}</p>
//       <p>Published: {book.publishYear}</p>
//       <p>Summary: {book.summary}</p>
//     </div>
//   );
// };

// export default BookDetails;
import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Spinner from '../components/Spinner';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 bg-red-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-red-600 transition-colors flex items-center"
      >
        <BiArrowBack className="mr-2" /> Back
      </button>

      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-6">{book.title}</h1>
          
          <div className="space-y-4">
            <div className="flex items-center border-b pb-4">
              <span className="text-gray-600 font-semibold w-32">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>
            
            <div className="flex items-center border-b pb-4">
              <span className="text-gray-600 font-semibold w-32">Published:</span>
              <span className="text-gray-800">{book.publishYear}</span>
            </div>
            
            <div className="pt-4">
              <h2 className="text-gray-600 font-semibold mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed">
                {book.summary || 'No summary available'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-600">Book not found</div>
      )}
    </div>
  );
};

export default BookDetails;