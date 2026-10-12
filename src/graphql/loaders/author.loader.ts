import { Types } from "mongoose";
import { Author } from "../../models";

export async function batchAuthors(authorIds: readonly string[]) {
  console.log("batchAuthors is called");
  // TODO: Implement batch loading of authors by their IDs. This function should return an array of authors corresponding to the provided authorIds.
  const authorObjectIds = authorIds.map((id) => new Types.ObjectId(id));

  const authors = await Author.find({ _id: { $in: authorObjectIds } });
  const authorMap = new Map<string, any>();
  authors.forEach((author) => {
    authorMap.set(author._id.toString(), author);
  });

  const returnValue = authorIds.map((id) => authorMap.get(id.toString())!);
  //   console.log({ returnValue }, { depth: null });
  return returnValue;
}
