//import React, { useState } from 'react';
import * as React from "react";
import { useState,useEffect } from "react";
import "./Tabs.css";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  //const [tabsData, setTabsData] = useState([]);
  const tabsData = [
    {
      title: "Global initiatives",
      tiles: [
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 3",
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 3",
        },
        {
          id: 3,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 3",
        },
        {
          id: 4,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 3",
        },
      ],
    },
    {
      title: "Brand identity",
      tiles: [
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 2",
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 2",
        },
      ],
    },
    {
      title: "HR , legal & compliance",
      tiles: [
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 3",
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 3",
        },
        {
          id: 3,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 3",
        },
        {
          id: 4,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 3",
        },
      ],
    },
    {
      title: "Betterment",
      tiles: [
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 1 in Tab 4",
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/30085252/pexels-photo-30085252/free-photo-of-majestic-volcano-landscape-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "Description for Tile 2 in Tab 4",
        },
      ],
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your SharePoint REST API endpoint
        const response = await fetch(
            "https://chandrudemo.sharepoint.com/sites/ApprovalManagementSystem/_api/web/lists/getbytitle('TestList')/items",
            {
              headers: {
                Accept: "application/json;odata=verbose", // Request JSON response
              },
            }
          );
          const data = await response.json();
        
        // Group data by tab title
        const groupedData = data.d.results.reduce((acc: any, item: any) => {
          const tabTitle = item.Title; // Assuming 'TabTitle' is the column for tab names
          if (!acc[tabTitle]) {
            acc[tabTitle] = [];
          }
          acc[tabTitle].push({
            id: item.Id,
            image: item.Image, // Assuming 'ImageUrl' is the column for image URLs
            description: item.Description, // Assuming 'Description' is the column for descriptions
          });
          return acc;
        }, {});

        // Transform grouped data into the required format
        const transformedData = Object.keys(groupedData).map((title) => ({
          title,
          tiles: groupedData[title],
        }));

        //setTabsData(transformedData);
      } catch (error) {
        console.error("Error fetching data from SharePoint:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabsData?.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabsData[activeTab]?.tiles.map((tile) => (
          <div key={tile.id} className="tile">
            <img
              src={tile.image}
              alt={`Tile ${tile.id}`}
              className="tile-image"
            />
            <h2 className="tile-title">Tile {tile.id}</h2>{" "}
            {/* Add title here */}
            <p className="tile-description">{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
