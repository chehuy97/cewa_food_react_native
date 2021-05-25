export const stores = [
    {
        "store_id": "1",
        "name": "Mi quang ba Mua",
        "address": "19 Tran Binh Trong",
        "type": "Bistro",
        "rating": 7.1,
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "store_id": "2",
        "name": "Tra sua Gong Cha",
        "address": "132 Nguyen Quang Thoai",
        "type": "Coffee/dessert",
        "rating": 8.2,
        "image":"../../assets/images/foods/gong_cha.jpeg"
    },
    {
        "store_id": "3",
        "name": "Lau Thai An Binh",
        "address": "134 Le Quy Don",
        "type": "Bistro",
        "rating": 6.5,
        "image":"../../assets/images/foods/lau_thai.jpeg"
    },
    {
        "store_id": "4",
        "name": "Banh Mi Ba Lan",
        "address": "12 Le Duan",
        "type": "Bakery",
        "rating": 7.7,
        "image":"../../assets/images/foods/banh_mi.jpeg"
    },
    {
        "store_id": "5",
        "name": "Mi quang ba Mua",
        "address": "19 Tran Binh Trong",
        "type": "Quan an",
        "rating": 7.9,
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "store_id": "6",
        "name": "Mi quang ba Mua",
        "address": "19 Tran Binh Trong",
        "type": "Quan an",
        "rating": 5.9,
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "store_id": "7",
        "name": "Mi quang ba Mua",
        "address": "19 Tran Binh Trong",
        "type": "Quan an",
        "rating": 6.2,
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "store_id": "8",
        "name": "Mi quang ba Mua",
        "address": "19 Tran Binh Trong",
        "type": "Quan an",
        "rating": 5.7,
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
]

export interface Store {
    store_id: string,
    name: string,
    address: string,
    type: string,
    rating: number,
    image:string
}

export const foods = [
    {
        "food_id": "1",
        "name": "Mi Quang Dac Biet",
        "price": "40,000d",
        "store_id" : "1",
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "food_id": "2",
        "name": "Mi Quang Tom Thit",
        "price": "30,000d",
        "store_id" : "1",
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "food_id": "3",
        "name": "Mi Quang Thit Trung",
        "price": "30,000d",
        "store_id" : "1",
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "food_id": "4",
        "name": "Mi Quang Ga Trung",
        "price": "30,000d",
        "store_id" : "1",
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "food_id": "5",
        "name": "Mi Quang Tom Ga",
        "price": "30,000d",
        "store_id" : "1",
        "image":"../../assets/images/foods/mi_quang.jpg"
    },
    {
        "food_id": "6",
        "name": "Tra sua Tran Chau",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
    {
        "food_id": "7",
        "name": "Tra sua Alisan",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
    {
        "food_id": "8",
        "name": "Tra sua Tra xanh",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
    {
        "food_id": "9",
        "name": "Tra sua Khoai Mon",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
    {
        "food_id": "10",
        "name": "Tra sua Dau Do",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
    {
        "food_id": "11",
        "name": "Tra sua Pho Mai",
        "price": "50,000d",
        "store_id" : "2",
        "image":"../../assets/images/foods/tra_sua.png"
    },
]

export interface Food {
    food_id: string,
    name: string,
    price: string,
    image:string,
    store_id:string
}