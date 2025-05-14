//import React, { useState } from 'react';
import * as React from "react";
import { useState,useEffect } from "react";
import "./Tabs.css";
import {sp} from "@pnp/sp/presets/all";
import { set } from "@microsoft/sp-lodash-subset";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let Tabs=[];
      await sp.web.lists.getByTitle("TestList").fields.getByInternalNameOrTitle("TestChoice").get().then(async(field:any) => 
      {
        await field.Choices.forEach((choice:any) => {
          Tabs.push({title:choice, tiles:[]});
        });

      }).catch((error) => {
        console.error("Error fetching data from SharePoint:", error);
      });

      await sp.web.lists.getByTitle("TestList").items.getAll().then(async(items:any) => 
      {
        await items.forEach((item:any) => {
          const tabIndex = Tabs.findIndex((tab:any) => tab.title === item.TestChoice);
          if (tabIndex !== -1) {
            Tabs[tabIndex].tiles.push({
              id: item.Id,
              image: item.Image,
              description: item.Description,
            });
          }
        });
        setTabsData(Tabs);
      }).catch((error) => {
        console.error("Error fetching data from SharePoint:", error);
      });

      // try {
      //   // Replace with your SharePoint REST API endpoint
      //   const response = await fetch(
      //       "https://chandrudemo.sharepoint.com/sites/ApprovalManagementSystem/_api/web/lists/getbytitle('TestList')/items",
      //       {
      //         headers: {
      //           Accept: "application/json;odata=verbose", // Request JSON response
      //         },
      //       }
      //     );
      //     const data = await response.json();
        
      //   // Group data by tab title
      //   const groupedData = data.d.results.reduce((acc: any, item: any) => {
      //     const tabTitle = item.Title; // Assuming 'TabTitle' is the column for tab names
      //     if (!acc[tabTitle]) {
      //       acc[tabTitle] = [];
      //     }
      //     acc[tabTitle].push({
      //       id: item.Id,
      //       image: item.Image, // Assuming 'ImageUrl' is the column for image URLs
      //       description: item.Description, // Assuming 'Description' is the column for descriptions
      //     });
      //     return acc;
      //   }, {});

      //   // Transform grouped data into the required format
      //   const transformedData = Object.keys(groupedData).map((title) => ({
      //     title,
      //     tiles: groupedData[title],
      //   }));

      //   //setTabsData(transformedData);
      // } catch (error) {
      //   console.error("Error fetching data from SharePoint:", error);
      // }
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
