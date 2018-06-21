export class Contact {
    _id : number;
    _name : string;
    _phoneNumber : string;
    _email : string;
    _dateOfBirth : string;
    _address : string;
    _state : string;
    constructor(_id : number, _name : string, _phoneNumber : string, _email : string, _dateOfBirth : string, _address : string, _state : string) {
        this._id = _id;
        this._name = _name;
        this._phoneNumber = _phoneNumber;
        this._email = _email;
        this._dateOfBirth = _dateOfBirth;
        this._address = _address;
        this._state = _state;
    }
    //getters
    get id() : number {
        return this._id;
    }
    get name() : string {
        return this._name;
    }
    get phoneNumber() : string {
        return this._phoneNumber;
    }
    get email() : string {
        return this._email;
    }
    get dateOfBirth() : string {
        return this._dateOfBirth;
    }
    get address() : string {
        return this._address;
    }
    get state() : string {
        return this._state;
    }
    //setters
    set id(_id : number) {
        this._id = _id;
    }
    set name(_name : string) {
        this._name = _name;
    }
    set phoneNumber(_phoneNumber : string) {
        this._phoneNumber = _phoneNumber;
    }
    set email(_email : string) {
        this._email = _email;
    }
    set dateOfBirth(_dateOfBirth : string) {
        this._dateOfBirth = _dateOfBirth;
    }
    set address(_address : string) {
        this._address = _address;
    }
    set state(_state : string) {
        this._state = _state;
    }
}