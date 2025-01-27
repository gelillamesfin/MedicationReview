export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};
export type Image = { filename: string; originalname: string;_id?:string };
export type Review = {
  _id?:string
  review: string;
  rating: number;
  by: { user_id: string; fullname: string };
  date: number;
};
export type Owner = { user_id: string; fullname: string; email: string };
export type Medication = {
  _id?:string;
  name: string;
  first_letter?: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  image?: Image;
  added_by: Owner;
  reviews: Review[];
};



export type newMed = {
  name: string;
  generic_name: string;
  medication_class: string;
  availability: string;
};
 
export type Med = {
  _id?: string;
  name: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  reviews: Review[];
  image?: Image;
};



export type NewReview = {
  review: string;
  rating: number;
};

export type ImageNews={
path:string
}