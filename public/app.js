(
  function(doc, win, $){
      (function (){
          return Seeker = {
              apiUrl: '/seeker',
              customSearch: false,
              $propList: $('.lista'),
              $tipo: $('#tipo'),
              $ciudad: $('#ciudad'),
              $busqueda: $('#checkPersonalizada'),
              $personalizada: $('#personalizada'),
              $buscador: $('#buscar'),
              $rangoPrecio: $("#rangoPrecio"),
              $propList: $('.lista'),
              propTemplate: '<div class="card horizontal">' +
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
                   '</div>',

              Init: function(){
                  var self = this
                  self.cityOptions = []
                  self.typeOptions = []
                  self.getOptions()
                  self.setSearch()
                  self.startSeekBtn()
              },
              startSeekBtn: function(){
                var self = this
                self.$buscador.on('click', (e) =>{
                  if(self.customSearch){
                    let slider = self.$rangoPrecio.data("ionRangeSlider");
                    let sliderFrom = slider.result.from
                    let sliderTo = slider.result.to
                    let selType = self.$tipo.val()
                    if(selType == ""){
                      selType = null
                    }
                    let selCity = self.$ciudad.val()
                    if(selCity == ""){
                      selCity = null
                    }
                    let payload = JSON.stringify({ 
                      Ciudad: selCity, 
                      Tipo: selType,
                      PrecioMin: sliderFrom,
                      PrecioMax: sliderTo 
                    })
                    self.ajaxRequest(self.apiUrl, 'POST', payload)
                          .done(function(data){
                            self.renderProps(data)
                          }).fail(function(err){
                              alert(err)
                          })
                  }else{
                    self.ajaxRequest(self.apiUrl, 'GET', {})
                          .done(function(data){
                            self.renderProps(data)
                          }).fail(function(err){
                              alert(err)
                          })
                  }
                })
              },
              renderProps: function(data){
                var self = this
                self.$propList.empty()
                self._renderProp()
              },
              _renderProp: function(){
                var self = this
                var property = self.propTemplate.replace(':ADDR:', 'Calle 1')
                                  .replace(':CITY:', 'Calle 1')
                                  .replace(':PHONE:', '12348712841')
                                  .replace(':ZIPCODE:', '1234567')
                                  .replace(':PRICE:', '$1200')
                                  .replace(':TYPE:', 'Casa')
                self.$propList.append(property)
              },
              setSearch: function(){
                var self = this
                self.$busqueda.on('change', (e) => {
                  if (this.customSearch == false) {
                    self.customSearch = true
                  } else {
                    self.customSearch = false
                  }
                  self.$personalizada.toggleClass('invisible')
                })
              },
              getOptions: function(){
                  var self = this
                  var endpoint = self.apiUrl + '/types'
                  self.ajaxRequest(endpoint, 'GET', {})
                          .done(function(data){
                              self.appendTypes(data)
                          }).fail(function(err){
                              alert(err)
                          })
                  var endpoint = self.apiUrl + '/cities'
                  self.ajaxRequest(endpoint, 'GET', {})
                          .done(function(data){
                              self.appendCities(data)
                          }).fail(function(err){
                              alert(err)
                          })
                  var endpoint = self.apiUrl + '/prices'
                  self.ajaxRequest(endpoint, 'GET', {})
                          .done(function(data){
                              self.appendPrices(data)
                          }).fail(function(err){
                              alert(err)
                          })
              },
              ajaxRequest: function(url, type, data){
                  return $.ajax({
                      url: url,
                      type: type,
                      data: data,
                      contentType: "application/json; charset=utf-8",
                      dataType: "json"
                  })
              },
              _appendCity: function(city){
                  $('#ciudad').append(`<option value="${city}">${city}</option>`);
              },
              _appendType: function(ty){
                  $('#tipo').append(`<option value="${ty}">${ty}</option>`)
              },
              appendCities: function(data){
                  var self = this
                  for (let i = 0; i < data.length; i++) {
                    self._appendCity(data[i])
                  }
              },
              appendTypes: function(data){
                  var self = this
                  for (let i = 0; i < data.length; i++) {
                    self._appendType(data[i])
                  }
              },
              appendPrices: function(data){                
                var self = this
                self.$rangoPrecio.ionRangeSlider({
                  type: "double",
                  grid: false,
                  min: data['min'],
                  max: data['max'],
                  from: data['min'],
                  to: data['max'],
                  prefix: "$"
                })
              }
          }
      })()
  Seeker.Init()
})(document, window, jQuery);

