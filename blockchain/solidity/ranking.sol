pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Ranking {
    // 최초로 누르면 user 등록
    // 누르면 최종 시간 변경
    // sorting
    // struct User {
    //     uint256 LastestModifiedTime;
    //     bytes32 name;
    // }
    string temp;
    bytes32[] public Users;
    mapping (bytes32 => uint256) public lastModifiedTime;
    // mapping (bytes32 => bytes32) public Names;
    mapping (bytes32 => uint256) public numSolved;
    mapping (uint256 => bytes32) public ranks;
    // mapping (uint8 => bytes32) public top3;
    constructor(string memory source ) public {
        temp = source;
    }
    function getNumSolved(bytes32 User_name) public returns (int256) {
        return int256(numSolved[User_name]);
    }

    function getLastModifiedTime(bytes32 User_name) public returns (int256) {
        return int256(lastModifiedTime[User_name]);
    }

    function solvedProblem(string memory user_name) public returns (int256) {
        bytes32 User_name = _stringToBytes32(user_name);
        int index = _getUserIndexByName(User_name);
        
        if(index == -1)
        {
            _createUserInfo(User_name);
        }
        else
        {
            _updateUserInfo(User_name);
        }

        return int256(Users.length);
    }

    function _updateUserInfo(bytes32 User_name) public {
        
        numSolved[User_name] +=1;
        lastModifiedTime[User_name] = block.timestamp;
        // Users[uint(index)].LastestModifiedTime = block.timestamp;
    }

    function _createUserInfo(bytes32 User_name) public {
        numSolved[User_name] = 1;
        Users.push(User_name);
        lastModifiedTime[User_name] = block.timestamp;
        // Users.push(User(block.timestamp,User_name));

    }

    function _getUserIndexByName(bytes32 User_name) view public returns (int)
    {

        int index = -1;
        for(int i = 0; i < int(Users.length); i++)
        {
            if(Users[uint(i)] == User_name)
            {
                index = i;
                break;
            }
        }
        return index;
    }
    function getNumberOfPlayers() view public returns (int256)
    {
        return int256(Users.length);
    }

    function _sortUsers(uint mode) public {
        if(mode == 1)
        {
            _sortByScore();
        }
        else if(mode == 2)
        {
            _sortByTimestamp();
        }
    } 

     function _sortByScore() public  {
            uint length = Users.length;
            for (uint i = 1; i < length; i++) {
                uint key = numSolved[Users[i]];
                bytes32 keyOwner = Users[i];
                int j = int(i) - 1;
                while ((int(j) >= 0) && (numSolved[ Users[uint(j)] ] < key)) {
                    Users[uint(j+1)] = Users[uint(j)]; 
                    // data[uint(j + 1)] = data[uint(j)];
                    j--;
                }
                Users[uint(j+1)] = keyOwner;
                // data[uint(j + 1)] = key;
            }
        }

    function _sortByTimestamp() public  {
        uint length = Users.length;
        for (uint i = 1; i < length; i++) {
            uint key = lastModifiedTime[Users[i]];
            bytes32 keyOwner = Users[i];
            int j = int(i) - 1;
            while ((int(j) >= 0) && (lastModifiedTime[ Users[uint(j)] ] > key)) {
                Users[uint(j+1)] = Users[uint(j)]; 
                // data[uint(j + 1)] = data[uint(j)];
                j--;
            }
            Users[uint(j+1)] = keyOwner;
            // data[uint(j + 1)] = key;
        }
    }

    // function getTop3() public returns (bytes32[] memory) {
    //     _sortUsers();
    //     bytes32[] memory Rankers;
    //     for(uint i = 0; i< 3; i++)
    //     {
    //         bytes32 user = Names[Users[i].name];
    //         Rankers.push(user);
    //     }
    //     return Rankers;
    // }

    function getRankerName(uint rank, uint mode) public returns (bytes32)
    {
        require(validMode(mode));
        //_sortUsers(mode);
        // _sortUsers();
        bytes32 user;
        user = Users[rank];
        return user;
    }

    function getRankByName(bytes32 User_name, uint mode) public returns (uint)
    {
        // bytes32 User_name = _stringToBytes32(user_name);
        require(validUser(User_name));
        require(validMode(mode));
        _sortUsers(mode);
        return uint(_getUserIndexByName(User_name));
    }

    function validUser(bytes32 User_name) view public returns(bool)
    {
        int index = _getUserIndexByName(User_name);
        if(index == -1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    function validMode(uint mode) view public returns(bool)
    {
        if(mode ==1 || mode ==2)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    function _stringToBytes32(string memory source) public returns (bytes32 result) 
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function _Bytes32ToString(bytes32  source) public returns (string memory) {
        string memory result = string(abi.encodePacked(source));
        return result;
    } 


}