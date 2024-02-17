// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Analytics = () => {
//   const { urlId } = useParams();
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5172/user/${urlId}/analytics`);
//         setAnalyticsData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching analytics data:', error.message);
//         navigate('/404'); // Redirect to 404 page if the URL is not found or other errors occur
//       }
//     };

//     fetchAnalyticsData();
//   }, [urlId, navigate]);

//   return (
//     <div>
//       <h1>Analytics</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <p>Visit Count: {analyticsData.visitCount}</p>
//           <h3>Visits:</h3>
//           <ul>
//             {analyticsData.visits.map((visit, index) => (
//               <li key={index}>{visit.timestamp}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Analytics;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = () => {
  const { urlId } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5172/user/${urlId}/analytics`);
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error.message);
        navigate('/404'); // Redirect to 404 page if the URL is not found or other errors occur
      }
    };

    fetchAnalyticsData();
  }, [urlId, navigate]);

  return (
    <div>
      <h1>Analytics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Visit Count: {analyticsData.visitCount}</p>
          <h3>Visits:</h3>
          <ul>
            {analyticsData.visits.map((visit, index) => (
              <li key={index}>{visit.timestamp}</li>
            ))}
          </ul>
          <h3>Visit Trends</h3>
          <BarChart width={600} height={300} data={analyticsData.visits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitCount" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Analytics;
