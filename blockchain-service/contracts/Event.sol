pragma solidity >0.5.0;

contract Event {
    struct MyEventEntry {
        string data;
        string eventDetails;
        uint256 timestamp;
        bytes32 checkSum;
        bool isSet;
        address setBy;
    }

    mapping(bytes32 => MyEventEntry) public myMapping;

    event NewEntry(
        bytes32 _checksum,
        string data,
        string eventDetails,
        address indexed _setBy
    );

    function createEvent(
        bytes32 _checksum,
        string memory _data,
        string memory _eventDetails
    ) public {
        require(!myMapping[_checksum].isSet);

        myMapping[_checksum].isSet = true;
        myMapping[_checksum].data = _data;
        myMapping[_checksum].eventDetails = _eventDetails;
        myMapping[_checksum].timestamp = block.timestamp;
        myMapping[_checksum].setBy = msg.sender;

        emit NewEntry(
            _checksum,
            _data,
            _eventDetails,
            msg.sender
        );
    }

    function getEvent(bytes32 _checksum)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address
        )
    {
        // require(myMapping[_checksum].isSet);

        return (
            myMapping[_checksum].data,
            myMapping[_checksum].eventDetails,
            myMapping[_checksum].timestamp,
            myMapping[_checksum].setBy
        );
    }
}