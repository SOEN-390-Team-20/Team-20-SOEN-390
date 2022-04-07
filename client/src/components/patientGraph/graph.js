import React from 'react';

function graph() {
  return (
    <>
      <br />
      <br />
      <iframe style={{ width: '40%', borderRadius: '25px' }} title="General Statistics" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/2772c0489f43411ca9493fc5888fbe67" height="550" width="100%" />
      <br />
      <br />
      <iframe style={{ width: '40%', borderRadius: '25px' }} title="Vaccinated Statistics" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/cfbd8528810042d38d4e184e6731f2f9" height="550" width="100%" />
      <br />
      <br />
      <iframe style={{ width: '40%', borderRadius: '25px' }} title="Daily Cases Statistics" src="https://covid19canada.maps.arcgis.com/apps/opsdashboard/index.html#/7856c4762c7443bab2caba8b3c16af64" height="500" width="100%" />
      <br />
      <br />
      <br />
    </>
  );
}

export default graph;
