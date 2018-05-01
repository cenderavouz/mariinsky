/*
--test
var k = new Kirov(1 , 1);
var r = k.add(3);
print(r) //5

--test context
var k2 = new Kirov(1 , 1);
var c2 = k1.ctx(3);
print(c2) //15

--test context_
var kmin = kirovar.minus(1, 1);
print(kmin) //0
var k3 = new Kirov(1 , 1);
var c3 = k3.ctx_(3);
print(c3) //3

--test context__
var k4 = new Kirov(1 , 1);
var c4 = k4.ctx__(3);
print(c4) //10

*/

function Kirov (a , b) {
    this.a = a;
    this.b = b;
}

Kirov.prototype.add = function(c) {
    var result = this.a + this.b + c;
    return result;  
}

Kirov.prototype.ctx = function(x) {
    var result = kirovx(x) + this.a + this.b;
    return result;
}

Kirov.prototype.ctx_ = function(x1) {
    var result = kirovar.minus(this.a, this.b) + x1;
    return result;  
}

Kirov.prototype.ctx__ = function(x1) {
    var k_ = new Kirov_(this.a , this.b);
    var k__ = k_.add(3)
    var result = k__ + this.a + this.b + x1;
    return result;  
}






