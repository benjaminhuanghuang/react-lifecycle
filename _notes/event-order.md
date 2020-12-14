## React events
- Constructor

- componentWillMount

- componentDidMount

- componentWillUnmount
Happens then hide a component.
It is the opportunity to clean up, like timer. 


## Load
```
Parent Counstructor
Parent componentWillMount
  Child Counstructor
  Child componentWillMount
  Child componentDidMount
Parent componentDidMount
```


## Set state
```
Parent setState
Parent shouldComponentUpdste
Parent componentWillUpdate
  Child componentWillReceiveProps
  Child shouldComponent
  Child componentWillUpdate
  Child componentDidUpdate
Parent componentDidUpdate
```

## Hide Child
```
Parent setState
Parent shouldComponentUpdste
Parent componentWillUpdate
  Child componentWillUnmount
Parent componentDidUpdate
```