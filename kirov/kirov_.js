function kirovx (x) {
    return x + 10;
}

var kirovar = {
    minus: function(a, b) {
        var result = a - b;
        return result;
    }
}

function Kirov_ (a , b) {
    this.a = a;
    this.b = b;
}

Kirov_.prototype.add = function(c) {
    var result = this.a + this.b + c;
    return result;  
}