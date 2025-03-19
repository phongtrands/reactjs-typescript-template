import { useEffect, useState } from "react";
import { AppService } from "../../services";

const Admin = () => {
    const [data, setData] = useState<[{ name: string }]>([{ name: '' }]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    console.log(123);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await AppService.createData();
        console.log(data);
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      Admin
      <ul>
        {data.map((i) => (
          <li>
            {i.name}
          </li>
        ))}
      </ul>
    </div>
  );
  };
  
  export default Admin;