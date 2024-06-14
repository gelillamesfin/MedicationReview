export type User = { _id: string, fullname: string, email: string, password: string }
export type Image = { filename: string, originalname: string }
export type Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number }
export type Owner = { user_id: string, fullname: string, email: string }
export type Medication = {
  _id?: string;
  name: string;
  first_letter: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  image: Image;
  added_by: Owner;
  reviews: Review[];
};


// // GET /medications/:medication_id
// response_body = { "success": boolean, "data": Medication } // without reviews

// // DELETE /medications/:medication_id
// response_body = { "success": boolean, "data": boolean }

// // POST /medications/:medication_id/reviews
// request_body = { "review": string, "rating": string }
// response_body = { "success": boolean, "data": string } // review_id

// GET /medications/:medication_id/reviews
// response_body = { "success": boolean, "data": Review[] } // only name

// // PUT /medications/:medication_id/reviews/:review_id
// request_body = { "review": string, "rating": string }
// response_body = { "success": boolean, "data": boolean }

// // GET /medications/:medication_id/reviews/:review_id
// response_body = { "success": boolean, "data": Review }

// // DELETE /medications/:medication_id/reviews/:review_id
// response_body = { "success": boolean, "data": boolean }

// // GET /medications/images/:image_id
// response_body = Binary of image file