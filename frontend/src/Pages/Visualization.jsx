import React from 'react';
import './Visualization.css';
//import './SignIn.css'

//import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DashboardHeader from '../Components/DashboardHeader';
import Footer from '../Components/Footer';



function Visualization() {
  return (
    <div>
      <DashboardHeader />
      <div class="iframe-container">
      <iframe title="AnalyseDuMarche" width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiYmVlMTE2MjUtMjAxNS00MGEyLTkyYTUtNzBjMzJmMmJkMmUxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Visualization;