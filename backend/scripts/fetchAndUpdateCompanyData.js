const mongoose = require('mongoose');
const axios = require('axios');
const Company = require('../models/entrepriseModel');

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/visionAnalytique', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Define the function to fetch data from Yahoo Finance API
async function fetchCompanyProfile(symbol) {
  try {
    const response = await axios.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=assetProfile`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const profile = response.data.quoteSummary.result[0].assetProfile || {};

    return {
      industry: profile.industry || null,
      sector: profile.sector || null,
      fullTimeEmployees: profile.fullTimeEmployees || null,
      auditRisk: profile.auditRisk || null,
      boardRisk: profile.boardRisk || null,
      compensationRisk: profile.compensationRisk || null,
      shareHolderRightsRisk: profile.shareHolderRightsRisk || null,
      overallRisk: profile.overallRisk || null,
    };
  } catch (error) {
    console.error(`Error fetching data for symbol ${symbol}:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    return null;
  }
}

// Function to update a single company
async function updateCompany(symbol, profileData) {
  try {
    await Company.updateOne(
      { symbole: symbol },
      {
        $set: {
          industrie: profileData.industry,
          secteur: profileData.sector,
          nbrEmploye: profileData.fullTimeEmployees,
          profilRisque: {
            risqueAudit: profileData.auditRisk,
            risqueConseilAdministration: profileData.boardRisk,
            risqRemuneration: profileData.compensationRisk,
            risqDroitsActionnaires: profileData.shareHolderRightsRisk,
            risqTotal: profileData.overallRisk,
          }
        }
      },
      { upsert: false }
    );
    console.log(`Updated data for symbol ${symbol}`);
  } catch (error) {
    console.error(`Error updating data for symbol ${symbol}:`, error.message);
  }
}

async function fetchAndUpdateCompanyData() {
  try {
    await connectToMongoDB();

    // Get only the first 40 company symbols from the database
    const companies = await Company.find({}, 'symbole').limit(40);
    const symbols = companies.map(company => company.symbole);

    console.log(`Processing ${symbols.length} companies`);

    for (const symbol of symbols) {
      const profileData = await fetchCompanyProfile(symbol);
      if (profileData) {
        await updateCompany(symbol, profileData);
      }
      // Add a delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("Company data update process completed!");
  } catch (error) {
    console.error('Error in fetchAndUpdateCompanyData:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Execute the function
fetchAndUpdateCompanyData().catch(console.error);