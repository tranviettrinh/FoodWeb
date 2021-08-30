import { BaseRouter } from "./BaseRouter";
import ratingService from '../services/RatingService';
import {validate} from '../middleware';
import {addAndUpdateRating} from '../validations';
import {getAndFilterRating} from '../validations';

class RatingRouter extends BaseRouter{
    private _service = ratingService;
    constructor(){
        super();
        this.init();
    }
    protected init(){
        this.router.post('/addrating',validate(addAndUpdateRating),this._service.addAndUpdateRating);
        this.router.post('/updaterating',validate(addAndUpdateRating),this._service.addAndUpdateRating);
        this.router.post('/getallrating',validate(getAndFilterRating),this._service.getAllRating);
        this.router.post('/getratingaverage',validate(getAndFilterRating),this._service.getRatingAverage);
        this.router.post('/ratingfilter',validate(getAndFilterRating),this._service.filterRatingByPoint);
    }
}

export = new RatingRouter().router;