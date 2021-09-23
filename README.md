# Flow

## Login

Saga is waiting for login action
Dispatch login action
Set an `access_token` key into local storage

## Logout

After waiting for login, saga wait for logout
Dispatch logout action
Delete the `acess_token`

## Navigate in Redux

Using library connected-react-router
Navigate by dispatching an action to redux-store

## Dashboard Students

Routing

- /admin/students: listing
- /admin/students/add: add new
- /admin/students/:studentID: update student

Listing

- Search by name
- Filter by city
- Sort by name, mark
- Pagination

Student slice state

- Loading
- List
- Pagination
- Filter {page: 1, limit: 10,...}

Add/Edit

- React Hook Form
- Yup

## Flow Search debounce

- onChange: Dispatch action setFilterDebounce
- when setFilterDebounce, setFilter to the newFilter
- StudentListTable run useEffect again to fetch new data

## Flow Delete student

- Click 'Remove' button in table:
  - Open dialog
  - setSelectedStudent to display the student's name
- Click 'Remove' button in dialog
  - Run `onRemove` function from parent
  - close dialog
- `onRemove` function from parent
  - call API to delete student
  - dispatch action to fetch the student again.
