var RenderClass = {
    init: function(){
        this.api
        this.cityOptions = []
        this.typeOptions = []
        this.appendCities()
        this.appendTypes()
    },
    _appendCity: function(city){
        $('#ciudad').append(`<option value="${city}">${city}</option>`);
    },
    _appendType: function(ty){
        $('#tipo').append(`<option value="${optionValue2}">${optionValue2}</option>`)
    },
    appendCities: function(){

    },
    appendTypes: function(){
        
    }
}

var propList = $('.lista')
var propTemplate = '<div class="card horizontal">' +
                   '<div class="card-image">' +
                   '<img src="img/home.jpg">' +
                   '</div>' +
                   '<div class="card-stacked">' +
                   '<div class="card-content">' +
                   '<div>' +
                   '<b>Direccion: </b><p>:ADDR:</p>' +
                   '</div>' +
                   '<div>' +
                   '<b>Ciudad: </b><p>:CITY:</p>' +
                   '</div>' +
                   '<div>' +
                   '<b>Telefono: </b><p>:PHONE:</p>' +
                   '</div>' +
                   '<div>' +
                   '<b>Código postal: </b><p>:ZIPCODE:</p>' +
                   '</div>' +
                   '<div>' +
                   '<b>Precio: </b><p>:PRICE:</p>' +
                   '</div>' +
                   '<div>' +
                   '<b>Tipo: </b><p>:TYPE:</p>' +
                   '</div>' +
                   '</div>' +
                   '<div class="card-action right-align">' +
                   '<a href="#">Ver más</a>' +
                   '</div>' +
                   '</div>' +
                   '</div>'

var property = propTemplate.replace(':ADDR:', 'Calle 1')
.replace(':CITY:', 'Calle 1')
.replace(':PHONE:', '12348712841')
.replace(':ZIPCODE:', '1234567')
.replace(':PRICE:', '$1200')
.replace(':TYPE:', 'Casa')

propList.append(property)