const  apiAirpollutionModel = require("./apiAirpollutionModel");

interface Result {
  _id: {
    longitude: number;
    latitude: number;
    date: string;
  };
  dups: string[];
  count: number;
}

  const airCollection = async () => {
    try {
      const results: Result[] = await apiAirpollutionModel.aggregate([
        {
          $group: {
            _id: {
              longitude: "$location.longitude",
              latitude: "$location.latitude",
              date: "$date.date_type",
            },
            dups: {
              $push: "$_id",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]);

      results.forEach(async (result: Result) => {
        await apiAirpollutionModel.deleteMany(
          { _id: { $in: result.dups.slice(1) } },
          (err: any) => {
            if (err) throw err;
            console.log(
              "Deleted " + (result.dups.length - 1) + " duplicate documents."
            );
          }
        );
      });

      console.log("successfully deleted");
    } catch (err) {
      console.log(err);
    }
  };

airCollection()
