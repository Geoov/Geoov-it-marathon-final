const crypto = require("crypto");

function routes(app, web3, contract) {
  const AN_CURENT = 2021;

  app.post("/api/blockchain", async (req, res) => {
    const email = req.body.email;
    const id_event = req.body.id_event;
    email_hashed = Buffer.from(email).toString("base64");
    console.log(email_hashed);

    if (email && id_event) {
      const dataToBeHashed = email + "_" + id_event;

      const address =
        "0x" +
        crypto
          .createHash("sha256")
          .update(dataToBeHashed + "test")
          .digest("hex");

      const eventDetails = id_event + " | " + AN_CURENT;

      const gasPrice = await web3.eth.getGasPrice();
      console.log(gasPrice);

      const gasEstimate = await contract.methods
        .createEvent(address, email_hashed, eventDetails)
        .estimateGas({ from: web3.eth.defaultAccount });
      console.log(gasEstimate);

      contract.methods
        .createEvent(address, email_hashed, eventDetails)
        .send({
          from: web3.eth.defaultAccount,
          gasPrice: gasPrice,
          gas: gasEstimate,
        })
        .on("transactionHash", async function (txn_hash) {
          console.log(txn_hash);
          // res.status(200).send({ txn_hash });
        })
        .on("receipt", function (receipt) {
          console.log("receipt", receipt);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          // console.log("confirmationNumber", confirmationNumber);
        })
        .on("error", function (error, receipt) {
          throw error;
        });
    } else {
      res.sendStatus(401);
    }
  });

  formatBlockchainData = (result) => {
    email = Buffer.from(result[0], 'base64').toString('ascii');
    eventDetails = result[1].split(" | ");
    const timestamp = new Date(result[2] * 1000);
    publishedOn =
      timestamp.getDate() +
      "." +
      (timestamp.getMonth() + 1) +
      "." +
      timestamp.getFullYear();
    issuedBy = result[3];

    eventDetails = {
      idEvent: eventDetails[0],
      yearEvent: eventDetails[1],
    };

    data = {
      email: email,
      eventDetails: eventDetails,
      publishedOn: publishedOn,
      issuedBy: issuedBy,
    };

    return data;
  };

  app.get("/api/blockchain", async (req, res) => {
    const email = req.query.email;
    const id_event = req.query.id_event;

    if (email && id_event) {
      const dataToBeHashed = email + "_" + id_event;

      const address =
        "0x" +
        crypto
          .createHash("sha256")
          .update(dataToBeHashed + "test")
          .digest("hex");

      contract.methods
        .getEvent(address)
        .call({ from: web3.eth.defaultAccount })
        .then(function (result) {
          formatedResult = formatBlockchainData(result);
          console.log(formatedResult);

          res.status(200).send(data);
        });
    } else {
      res.sendStatus(401);
    }
  });
}

module.exports = routes;
