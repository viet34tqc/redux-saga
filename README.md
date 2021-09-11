# Flow

## Login

Saga is waiting for login action
Dispatch login action
Set an `access_token` key into local storage

## Logout

After waiting for login, saga wait for logout
Dispatch logout action
Delete the `acess_token`

## Navigate in saga
