export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const CATEGORY_OPTIONS = ['General', 'OBC', 'SC', 'ST', 'Other'];

export const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const COURSE_OPTIONS = [
  'B.Tech Computer Science',
  'B.Tech Electronics',
  'B.Tech Mechanical',
  'B.Tech Civil',
  'B.Tech Electrical',
  'B.Tech IT',
  'BCA',
  'BBA',
  'B.Com',
  'B.Sc Computer Science',
  'B.Sc Mathematics',
  'B.Sc Physics',
  'BA English',
  'BA Economics',
  'BA Political Science',
  'M.Tech Computer Science',
  'M.Tech Electronics',
  'MBA',
  'MCA',
  'M.Com',
  'M.Sc Computer Science',
  'M.Sc Mathematics',
  'MA English',
  'Ph.D',
  'Diploma Engineering',
  'Other',
];

export const BOARD_OPTIONS = [
  'CBSE',
  'ICSE',
  'State Board',
  'NIOS',
  'IB',
  'Cambridge (IGCSE)',
  'Other',
];

export const STATE_OPTIONS = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export const PASSING_YEAR_OPTIONS = Array.from(
  { length: 15 },
  (_, i) => (new Date().getFullYear() - 5 + i).toString()
);
