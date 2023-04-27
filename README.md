# CarCar

Team:

* Person 1 - Brandon Dinh (Service microservice)
* Person 2 - Aaron Tran (Sales microservice)
* Person 3 - Adrianna Helfrich (Sales microservice)

## Installation

**Cloning down the Repository:**
1. Open your command line and navigate to a directory where you would like this project to be cloned to
2. To clone via HTTPS run: `git clone https://gitlab.com/dinhbrandon/project-beta.git`

**Setting up Docker:** \
In your command line run the following snippets of code:
1. Create the Docker Volume required for Project Beta:
`docker volume create beta-data`
2. Build docker images:
`docker-compose build`
3. Starts and runs docker containers:
`docker-compose up`

Now you should have a running application on **http://localhost:3000**! \
Refer to the documentation below for a breakdown of the urls and features associated with the application.

Depending on which version of the application you would like to run, switch to either of these branches:
- `git checkout main` (Brandon & Adrianna)
- `git checkout main2` (Brandon & Aaron)

## Design

### Diagram of Architecture
![Diagram of Architecture](Diagram.PNG)

### URLs & Ports for Microservices
**Inventory-API** \
URL: http://localhost:8100/ \
Ports: 8100:8000

**Sales-API** \
URL: http://localhost:8090/ \
Ports: 8090:8000

**Service-API** \
URL: http://localhost:8080/ \
Ports: 8080:8000

**React** \
URL: http://localhost:3000/ \
Ports: 3000:3000

**Database** \
URL: http://localhost:15432:5432/ \
Ports: 15432:5432


### CRUD Routes
#### Manufacturer
**POST** \
URL: http://localhost:8100/manufacturers/:id/ \
Description: Creates a manufacturer \
Sample POST Data:
```
{
    “name”: “manufacturer_name”
}

```
Expected Response Data Example:
```
{
    “href”: “/api/manufacturers/1/”,
    “id”: 1,
    “name”: “manufacturer_name”
}
```
**GET** \
URL: http://localhost:8100/manufacturers/ \
Description: Grabs the list of manufacturers \
Expected Response Data:
```
{
    “manufacturers”: [
        {
            “href”: “/api/manufacturers/1/”,
            “id”: 1,
            “name”: “manufacturer_name”
        }
    ]
}

```
**GET** \
URL: http://localhost:8100/manufacturers/:id/ \
Description: Grabs a specific manufacturer \
Expected Response Data:
```
{
    “href”: “/api/manufacturers/1/”,
    “id”: 1,
    “name”: “manufacturer_name”
}

```
**PUT** \
URL: http://localhost:8100/manufacturers/:id/ \
Description: Updates a specific manufacturer \
Sample PUT Data:
```
{
    “name”: “manufacturer_name”
}
```
Expected Response Data:
```
{
    “href”: “/api/manufacturers/1/”,
    “id”: 1,
    “name”: “manufacturer_name”
}

```
**DELETE** \
URL: http://localhost:8100/manufacturers \
Description: Deletes a specific manufacturer \
Expected Response Data:
```
{
    “id”: null,
    “name”: “manufacturer_name”
}
```
#### Vehicle Models (Inventory-API)
**POST** \
URL: http://localhost:8100/api/models/ \
Description: Creates a vehicle model \
Sample POST Data:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}

```
Expected Response Data:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Honda"
	}
}
```

**GET** \
URL: http://localhost:8100/api/models/ \
Description: List all vehicle models \
Expected Response Data Example:
```
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "Sebring",
			"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Chrysler"
			}
		},
		{
			"href": "/api/models/3/",
			"id": 3,
			"name": "Sebring",
			"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Chrysler"
			}
		},
		{
			"href": "/api/models/4/",
			"id": 4,
			"name": "Tundra",
			"picture_url": "https://cdn.shopify.com/s/files/1/0175/8496/products/color_blackwhite_1_reid_sneakers_800x800.jpg?v=1618340529",
			"manufacturer": {
				"href": "/api/manufacturers/2/",
				"id": 2,
				"name": "Toyota"
			}
		}
	]
}

```

**GET** \
URL: http://localhost:8100/api/models/:id/ \
Description: List specific vehicle models \
Expected Response Data Example:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}

```

**PUT** \
URL: http://localhost:8100/api/models/:id/ \
Description: Update specific vehicle models \
Expected Response Data Example:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Tundra",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}

```

**DELETE** \
URL: http://localhost:8100/api/models/:id/ \
Description: Delete specific vehicle model \
Expected Response Data Example:
```
{
	"message": "Successfully deleted."
}

```

#### Automobiles (Inventory-API)

**GET** \
URL: http://localhost:8100/api/automobiles/ \
Description: Gets list of all automobiles\
Expected Response Data:
```
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120174/",
			"id": 1,
			"color": "red",
			"year": 2012,
			"vin": "1C3CC5FB2AN120174",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Sebring",
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			},
			"sold": false
		},
			]
}
```
\
**POST** \
URL: http://localhost:8100/api/automobiles/ \
Description: Creates new automobile \
Sample CRUD Data:
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Expected Response Data:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}
```
\
**PUT** \
URL:  http://localhost:8100/api/automobiles/:vin/\
Description: Edit a specific automobile\
Sample CRUD Data:
```
{
	"color": "pink"
}
```
Expected Response Data:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "pink",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}
```
\
**DELETE** \
URL: http://localhost:8100/api/automobiles/:vin/ \
Description: Delete a specific automobile \
Expected Response Data:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "pink",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}

```


**Placeholder For Service API**

#### Salesperson (Sales-API Main2-Aaron)
**POST** \
URL: http://localhost:8090/api/salespeople/ \
Description: Create a salesperson \
Sample POST Data:
```
{
	"first_name": "Person",
	"last_name": "One",
	"employee_id": "1"
}
```
Expected Response Data:
```
{
	"href": "/api/salespeople/1/",
	"id": 1,
	"first_name": "Person",
	"last_name": "One",
	"employee_id": "1"
}
```
**GET** \
URL: http://localhost:8090/api/salespeople/ \
Description: Grabs the list of salespeople \
Expected Response Data:
```
{
	"salespeople": [
		{
			"href": "/api/salespeople/1/",
			"id": 1,
			"first_name": "Person",
			"last_name": "One",
			"employee_id": "1"
		},
		{
			"href": "/api/salespeople/2/",
			"id": 2,
			"first_name": "Person",
			"last_name": "Two",
			"employee_id": "2"
		},
	]
}
```
**DELETE** \
URL: http://localhost:8090/api/salespeople/:id \
Description: Deletes a specific salesperson \
Expected Response Data:
```
{
	"id": null,
	"first_name": "Person",
	"last_name": "One",
	"employee_id": "1"
}
```
#### Customer (Sales-API Main2-Aaron)
**POST** \
URL: http://localhost:8090/api/customers/ \
Description: Creates a customer \
Sample POST Data:
```
{
	"first_name": "Customer",
	"last_name": "One",
	"address": "Customer One Address",
	"phone_number": "111-111-1111"
}
```
Expected Response Data:
```
{
	"href": "/api/customers/1",
	"id": 1,
	"first_name": "Customer",
	"last_name": "One",
	"address": "Customer One Address",
	"phone_number": "111-111-1111"
}
```
**GET** \
URL: http://localhost:8090/api/customers/ \
Description: Grabs the list of customers \
Expected Response Data:
```
{
	"customers": [
        {
            "href": "/api/customers/1",
            "id": 1,
            "first_name": "Customer",
            "last_name": "One",
            "address": "Customer One Address",
            "phone_number": "111-111-1111"
        },
		{
			"href": "/api/customers/2",
			"id": 2,
			"first_name": "Customer",
			"last_name": "Two",
			"address": "Customer Two Address",
			"phone_number": "222-222-2222"
		},
	]
}
```
**DELETE** \
URL: http://localhost:8090/api/customers/:id \
Description: Deletes a specific customer \
Expected Response Data:
```
{
	"id": null,
    "first_name": "Customer",
    "last_name": "One",
    "address": "Customer One Address",
    "phone_number": "111-111-1111"
}
```
#### Sale (Sales-API Main2-Aaron)
**POST** \
URL: http://localhost:8090/api/sales/ \
Description: Creates a sale \
Sample POST Data:
```
{
	"automobile": "/api/automobiles/VinNumber1/",
	"salesperson_id": 1,
	"customer_id": 1,
	"price": 50000
}
```
Expected Response Data:
```
{
	"href": "/api/sales/1/",
	"id": 1,
	"automobile": {
		"import_href": "/api/automobiles/VinNumber1/",
		"vin": "VinNumber1",
		"sold": true
	},
	"salesperson": {
		"href": "/api/salespeople/1/",
		"id": 1,
		"first_name": "Person",
		"last_name": "One",
		"employee_id": "1"
	},
	"customer": {
		"href": "/api/customers/1",
		"id": 1,
		"first_name": "Customer",
		"last_name": "One",
		"address": "Customer One Address",
		"phone_number": "111-111-1111"
	},
	"price": 50000
}
```
**GET** \
URL: http://localhost:8090/api/sales/ \
Description: Grabs the list of sales \
Expected Response Data:
```
{
	"sales": [
        {
            "href": "/api/sales/1/",
            "id": 1,
            "automobile": {
                "import_href": "/api/automobiles/VinNumber1/",
                "vin": "VinNumber1",
                "sold": true
            },
            "salesperson": {
                "href": "/api/salespeople/1/",
                "id": 1,
                "first_name": "Person",
                "last_name": "One",
                "employee_id": "1"
            },
            "customer": {
                "href": "/api/customers/1",
                "id": 1,
                "first_name": "Customer",
                "last_name": "One",
                "address": "Customer One Address",
                "phone_number": "111-111-1111"
            },
            "price": 50000
        },
		{
			"href": "/api/sales/2/",
			"id": 2,
			"automobile": {
				"import_href": "/api/automobiles/VinNumber2/",
				"vin": "VinNumber2",
				"sold": true
			},
			"salesperson": {
				"href": "/api/salespeople/1/",
				"id": 1,
				"first_name": "Person",
				"last_name": "One",
				"employee_id": "1"
			},
			"customer": {
				"href": "/api/customers/2",
				"id": 2,
				"first_name": "Customer",
				"last_name": "Two",
				"address": "Customer Two Address",
				"phone_number": "222-222-2222"
			},
			"price": 25000
		},
	]
}
```
**DELETE**
URL: http://localhost:8090/api/sales/:id \
Description: Deletes a specific sale \
Expected Response Data:
```
{
	"id": null,
	"automobile": {
        "import_href": "/api/automobiles/VinNumber2/",
        "vin": "VinNumber2",
        "sold": true
    },
    "salesperson": {
        "href": "/api/salespeople/1/",
        "id": 1,
        "first_name": "Person",
        "last_name": "One",
        "employee_id": "1"
    },
    "customer": {
        "href": "/api/customers/2",
        "id": 2,
        "first_name": "Customer",
        "last_name": "Two",
        "address": "Customer Two Address",
        "phone_number": "222-222-2222"
    },
    "price": 25000
}
```
#### AutomobileVO (Sales-API Main2-Aaron)
**GET** \
URL: http://localhost:8090/api/autoVO/ \
Description: Grabs the list of Automobile Value Objects \
Expected Response Data:
```
{
	"autos": [
		{
			"import_href": "/api/automobiles/VinNumber1/",
			"vin": "VinNumber1",
			"sold": false
		},
        {
			"import_href": "/api/automobiles/VinNumber2/",
			"vin": "VinNumber2",
			"sold": false
		},
    ]
}
```

**Placeholder For Sales Adrianna**

**Placeholder Method** \
URL: \
Description: \
Sample CRUD Data:
```
Code block
```
Expected Response Data:
```
Code block
```

### Value Objects

Sales-Api (**AutomobileVO**)

Why **AutomobileVO**?
- You need **vin** and **sold** information from the Automobile Model present in the Inventory microservice to create a record of a car sale in the sales microservice

Properties of **AutomobileVO**:
-  By polling automobile information from the Inventory microservice we can create value object models with **import_href**, **vin**, and **sold** properties
- **Import_href** is derived based off of the **href** property of the Automobile model and serves as the backend value that is used to reference the AutomobileVO object in CRUD requests
- **Vin** information is directly polled from the Inventory microservice and is used for user-friendly display of data in front-end forms
- **Sold** property allows admin to accurately make sell records with cars that have not been sold


## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

## Sales microservice (Main2-Aaron)

### Models

#### Salesperson
- Includes **first_name**, **last_name**, and **employee_id** properties
- Serves to deal with data involving Salespeople (create a salesperson, get a list of salespeople, delete a salesperson)
-Used to display a list of salespeople for users to interact with
- Referenced through the use of a Foreign Key when creating a record of a car sale

#### Customer
- Includes **first_name**, **last_name**, **address**, and **phone_number** properties
- Serves to deal with data involving Customers (create a customer, get a list of customers, delete a customer)
- Used to display a list of customers for users to interact with
- Referenced through the use of a Foreign Key when creating a record of a car sale

#### Sale
- Includes **automobile**, **salesperson**, **customer**, and **price** properties. The automobile, salesperson, and customer properties are all foreign keys associated with the other models present in the sales microservice
- Serves to deal with data involving Sales (create a sale, get a list of sales, delete a sale)
- Used to display a list of sales as well as create a salesperson history webpage for users to interact with

#### AutomobileVO
- Includes **import_href**, **vin**, and **sold** properties
- Serves to deal with data required from the Automobile Model present in the Inventory-API
- Referenced through the use of a Foreign Key when creating a record of a car sale

#### Integration with Inventory Microservice
- To create a record of a car sale, the microservice requires Automobile data (href, vin, and sold properties) present in the Inventory Microservice
- Created a poller that requests data from the Automobile Model and utilizes that information to create a AutomobileVO model
- With the data present in AutomobileVO (import_href and vin), we can create a record of a car sale and adjust the sold property of the model accordingly
