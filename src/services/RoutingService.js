/** 
* @class Spectrum Spatial Routing Service wrapper
* @augments L.SpectrumSpatial.Services.Service 
* @constructs L.SpectrumSpatial.Services.RoutingService
* @param {string} url Url of service
* @param {Services.Service.Options} options Additional options of service
*/
L.SpectrumSpatial.Services.RoutingService = L.SpectrumSpatial.Services.Service.extend(
/** @lends L.SpectrumSpatial.Services.RoutingService.prototype */
{
	
	/**
    * GetRoute function's options
    * @typedef {Object} L.SpectrumSpatial.Services.RoutingService.GetRouteOptions
    * @property {string} [intermediatePoints] String representation of intermediate point's list. For example: -74.2,40.8,-73,42,epsg:4326 
    * @property {boolean} [oip] A processing parameter that indicates if the intermediate points should be optimized 
    * @property {string} [destinationSrs] The coordinate system to return the route and resulting geometries
    * @property {string} [optimizeBy='time'] The type of optimizing to use for the route. Valid values are time or distance
    * @property {boolean} [returnDistance=true] The route directions include the distance traveled
    * @property {string} [distanceUnit='m'] The units to return distance
    * @property {boolean} [returnTime=true] The route directions include the time it takes to follow a direction
    * @property {string} [timeUnit='min'] The units to return time
    * @property {string} [language='en'] The language the travel directions should be returned, only if route directions are returned
    * @property {string} [directionsStyle='None'] The type of route directions to return
    * @property {string} [segmentGeometryStyle='None'] The format of the geometry that represents a segment of the route
    * @property {boolean} [primaryNameOnly=false] Whether to return all names for a given street in the directions or to return just the primary name for a street
    * @property {boolean} [majorRoads=false] Whether to include all roads in the calculation or just major roads
    * @property {string} [historicTrafficTimeBucket='None'] Specifies whether the routing calculation uses the historic traffic speeds
    */
	
    /**
    * The GetRoute service returns routing information for a set of two distinct points or multiple points.
    * @param {Object} startPoint The start location of the route. Example: { x : 1, y : 2 }
    * @param {Object} endPoint The end location of the route. Example: { x : 2, y : 3 }
    * @param {string} srs Reference system for start and end points
    * @param {Request.Callback} callback Callback of the function
    * @param {Object} context Context for callback
    * @param {L.SpectrumSpatial.Services.RoutingService.GetRouteOptions} [options] GetRoute options
    */
    getRoute : function(startPoint, endPoint, srs, callback, context, options){  
        var operation = new L.SpectrumSpatial.Services.Operation('databases/'+ this._getDbSource(options) +'.json', { paramsSeparator: '&', queryStartCharacter:'?'});
        operation.options.getParams.q = 'route';
        
        operation.options.getParams.startPoint = startPoint.x + ',' + startPoint.y + ',' + srs;
        operation.options.getParams.endPoint = endPoint.x + ',' + endPoint.y + ',' + srs;
        
        L.SpectrumSpatial.Utils.merge(operation.options.getParams,options);
        this.startRequest(operation, callback, context);
    },
    
    /**
    * GetTravelBoundary function's options
    * @typedef {Object} L.SpectrumSpatial.Services.RoutingService.GetTravelBoundaryOptions
    * @property {string} [costUnit] The type of metric used to calculate the travel boundary
    * @property {number} [maxOffroadDistance] The maximum distance to allow travel off the road network using the maxOffroadDistanceUnit
    * @property {string} [maxOffroadDistanceUnit] The distance unit defining the maxOffroadDistance
    * @property {string} [destinationSrs] The coordinate system to return the travel boundary geometries
    * @property {boolean} [majorRoads=true] Whether to include all roads in the calculation or just major roads
    * @property {boolean} [returnHoles=false] Specifies whether you want to return holes, which are areas within the larger boundary that cannot be reached within the desired time or distance, based on the road network
    * @property {boolean} [returnIslands=false] Specifies whether you want to return islands, which are small areas outside the main boundary that can be reached within the desired time or distance
    * @property {number} [simplificationFactor=0.5] What percentage of the original points should be returned or upon which the resulting complexity of geometries should be based. A number between 0.0 and 1.0 where 0.0 is very simple and 1.0 means the most complex
    * @property {string} [bandingStyle='Donut'] The style of banding to be used in the result
    * @property {string} [historicTrafficTimeBucket='None'] Specifies whether the routing calculation uses the historic traffic speeds
    */
    
    /**
    * GetTravelBoundary determines a drive or walk time or distance boundary from a location.
    * @param {Object} point The start location from where to calculate the travel boundary. Example: { x : 1, y : 2 }
    * @param {string} srs Reference system
    * @param {string} costs The cost distance or time, in the cost units specified. You can also specify multiple costs by specifying the values as a comma delimited string
    * @param {Request.Callback} callback Callback of the function
    * @param {Object} context Context for callback
    * @param {L.SpectrumSpatial.Services.RoutingService.GetTravelBoundaryOptions} options GetTravelBoundary options
    */
    getTravelBoundary : function(point, srs, costs, callback, context, options){  
        var operation = new L.SpectrumSpatial.Services.Operation('databases/'+ this._getDbSource(options)  +'.json', { paramsSeparator: '&', queryStartCharacter:'?'});
        operation.options.getParams.q = 'travelBoundary';
        
        operation.options.getParams.point = point.x + ',' + point.y + ',' + srs;
        operation.options.getParams.costs = costs;

        L.SpectrumSpatial.Utils.merge(operation.options.getParams,options);
        this.startRequest(operation, callback, context);
    },
    
    _getDbSource: function(options){
	    if (options && options.dbsource){
		    return options.dbsource;
	    }
	    else{
		    return this.options.dbsource;
	    }
    }
       
});

L.SpectrumSpatial.Services.routingService = function(url,options){
  return new L.SpectrumSpatial.Services.RoutingService(url,options);
};