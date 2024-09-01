import mongoose, { Schema, SchemaType } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const UserVideo = new Schema(
  {
    videoFile: {
      type: String, //cloudinary url se aayega yaha
      required: true,
    },
    thumbnail: {
      type: String, //it is also comes from the cloudniary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

UserVideo.plugin(mongooseAggregatePaginate);

export default video = mongoose.model("video", UserVideo);
