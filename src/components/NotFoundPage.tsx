import { Result } from 'antd';
function NotFoundPage() {
 


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
    
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        // extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
      />
    </div>
  );
}

export default NotFoundPage;
