const GetMarketplaceItems = async (req, res, next) => {
  try {
    const marketplaceItems = [
      {
        id: 1,
        source: "Solar",
        quantity: 50,
        pricePerUnit: 15,
        percentageChange: 0.34,
      },
      {
        id: 2,
        source: "Wind",
        quantity: 30,
        pricePerUnit: 14,
        percentageChange: -0.042,
      },
      {
        id: 3,
        source: "Hydro",
        quantity: 20,
        pricePerUnit: 16,
        percentageChange: -0.001,
      },
      {
        id: 4,
        source: "Geothermal",
        quantity: 10,
        pricePerUnit: 18,
        percentageChange: -0.02,
      },
    ];

    return res.status(200).json(marketplaceItems);
  } catch (error) {
    next(error);
  }
};

module.exports = GetMarketplaceItems;
