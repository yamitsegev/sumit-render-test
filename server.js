const express = require("express");

const app = express();

const COMPANY_ID = 1812309348;
const API_KEY = process.env.SUMIT_API_KEY;

app.get("/", (req, res) => {
  res.send("SUMIT test server is running");
});

app.get("/test-sumit", async (req, res) => {
  try {
    const response = await fetch("https://api.sumit.co.il/billing/payments/beginredirect/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Customer: {
          Name: "בדיקת Render"
        },
        Items: [
          {
            Item: {
              Name: "בדיקת תשלום"
            },
            Quantity: 1,
            UnitPrice: 1
          }
        ],
        VATIncluded: true,
        RedirectURL: "https://www.bridel.shop",
        CancelRedirectURL: "https://www.bridel.shop",
        Credentials: {
          CompanyID: COMPANY_ID,
          APIKey: API_KEY
        },
        ResponseLanguage: "he"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
