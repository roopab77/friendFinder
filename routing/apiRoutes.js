// import list data
const tableData = require("../data/friendData");

// create and export API routes
module.exports = function(app) {

  // create GET route to send back tableData as JSON
  app.get("/api/friendlist", function(req, res) {
    res.json(tableData);
  });

  // create POST route to receive data from our front end and add it to our tableData
  app.post("/api/friendlist", function(req, res) {
    console.log("hi");
    // grab sent information (gets stored in req.body);
    const newfriend = req.body;
    let friendswithTotal = [];
    let matchedfriend ;

    
    //find a match for the data 
    for (var i =0; i <tableData.length;i++)
    {
      var totaldifference = 0;
      for (var j=0; j<10;j++)
      {
        var scoredifference = Math.abs(tableData[i].scores[j] - newfriend.scores[j]);
        totaldifference = totaldifference + scoredifference;
      }
      friendswithTotal.push({name : tableData[i].name,
        imageURL : tableData[i].imageURL,
        difference : totaldifference});
      
    }

    friendswithTotal.sort(compareValues('difference'));
    matchedfriend = friendswithTotal[0];
    console.log(friendswithTotal);
   
    // add to our list of table reservations
    tableData.push(newfriend);

    res.json(matchedfriend);
  });

 
}

//This function sorts the array in ascending order based on the total difference
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
        return 0; 
    }

    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}

