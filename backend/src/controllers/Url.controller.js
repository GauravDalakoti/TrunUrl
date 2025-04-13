import { URL } from "../models/Url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid"
import {UAParser} from 'ua-parser-js';

const BASE_URL = process.env.BASE_URL

const createUrl = asyncHandler(async (req, res) => {

    const { url } = req.body;

    console.log(url);

    if (!url) {

        throw new ApiError(400, "url must be required")
    }

    let existing = await URL.findOne({ rdirectURL: url });

    if (existing) {
        return res.json(new ApiResponse(200, { shortUrl: `${BASE_URL}/${existing.shortId}` }));
    }

    const shortId = nanoid(8)

    const createdURL = await URL.create({

        shortId,
        redirectURL: url,
        shortUrl: `${BASE_URL}/${shortId}`,
        createdBy: req.user?._id,
        viewHistory: []
    })

    if (!createdURL) {

        throw new ApiError(400, "Error while creating the url")
    }

    console.log("is this is correct");


    return res.status(200)
        .json(new ApiResponse(200, { shortUrl: `${BASE_URL}/${shortId}` }, "url shorted successfully"))
})

const redirectToUrl = asyncHandler(async (req, res) => {

    const { shortId } = req.params;

    if (!shortId) {

        throw new ApiError(400, "Short Id is required")
    }

    const parser = new UAParser(req.headers['user-agent']);
    const ua = parser.getResult();
  
    const device = ua.device.type || 'desktop'; 

    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {

            $push: {

                viewHistory: {

                    timestamps: Date.now(),
                    device
                }
            }
        }
    )

    res.redirect(entry.redirectURL)

})

const getAllUrl = asyncHandler(async (req, res) => {

    const allUrls = await URL.find({ createdBy: req.user?._id })

    if (!allUrls) {

        throw new ApiError(400, "Something went wrong while fetching urls from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, allUrls, "All Urls fetched successfully"))

})

export { createUrl, redirectToUrl, getAllUrl }