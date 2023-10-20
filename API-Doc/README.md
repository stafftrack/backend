# API Documentation

## Create Entry

- End Point: `/entry`
- Method:  `POST`
- Request Headers:

| Field        | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| Content-Type | String | Only accept `multipart/form-data`. |


- Request Body:
- 一個是圖片檔案, 一個是json格式

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| image    | File   | Image File  |

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| empId    | String | Required    |
| shift    | Time   | Required    |
| deptId   | String | Required    |
| zone     | String | Required    |
| date     | String | Required    |
| entryTime | String | Required |

- Request Body Example:
```json
{
    "empId": "EMP017",
    "shift": "7:30",
    "deptId": "DEPT4",
    "zone": "AZ",
    "date": "9/11/2023",
    "entryTime":"7:14"
}
```


## Entry Search

- End Point: `/entry`
- Method:  `GET`
- Request Headers:

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| Content-Type | String | Only accept `application/json`. |

- Request Parameters:

| Field     | Type   | Description                               |
| --------- | ------ | -----------------------------------|
| empId     | String |  |
| startDate | String ||
| endDate   | ||
| deptId    | ||
| status    | Bool ||

- Request Example: `https://[HOST_NAME]/api/attendance?startDate=2023-01-01&endDate=2023-01-31&deptId=HR&status=true`

Response Example:
```json
{
  {
    "empId": "EMP017",
    "shift": "7:30",
    "deptId": "DEPT4",
    "zone": "AZ",
    "date": "9/11/2023", 
    "entryTime":"7:14",
    "status": "On time" | "Late",   
    "has_contraband": false,  
  },
  ...
}

```

## Get Security Data

- End Point: `/security`
- Method:  `GET`
- Request Headers:

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| Content-Type | String | Only accept `application/json`. |


```json
[
  {
    "id": 1, // 指違禁品的id
    "empId": "EMP000",
    "shift": "9:00",
    "departmentId": "DEPT4",
    "zone": "HQ",
    "date": "9/11/2023", 
    "entryTime":"7:14",
    "contraband": {
      "electronicDevice": 0,
      "laptop": 0,
      "scissor": 2,
      "knife": 1,
      "gun": 1,
    },
    "image": "url_to_image_file",
  },
  ...
]

```


