import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) {

  const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

    const [state, dispatch] = React.useReducer(reducerSwitch, initialState);

    const onConfirm = () => {
      dispatch({
        type: actionTypes.confirm
      })
    };

    const onError = () => {
      dispatch({
        type: actionTypes.error
      })
    };

    const onWrite = (value) => {
      dispatch({
        type: actionTypes.write,
        payload: value,
      })
    };

    const onCheck = () => {
      dispatch({
        type: actionTypes.check
      })
    };

    const onDelete = () => {
      dispatch({
        type: actionTypes.delete
      })
    };

    const onReset = () => {
      dispatch({
        type: actionTypes.reset
      })
    };
  
    React.useEffect(() => {
        console.log('Empezando el efecto');
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion');
                if (state.value === SECURITY_CODE) {
                  onConfirm();
                } else {
                  onError();
                }
                console.log('Terminando la validacion');
            }, 3000);
        }
        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
      return (
        <div>
          <h2>Eliminar {name}</h2>
          <p>Por favor, escribe el código de seguridad.</p>

          {(state.error && !state.loading) && (
            <p>Error: el código es incorrecto</p>
          )}

          {state.loading && (
            <p>Cargando...</p>
          )}

          <input 
            placeholder="Código de seguridad"
            value={state.value}
            onChange={(e) => {
              onWrite(e.target.value);
            }}
          />
          <button onClick={onCheck}>Comprobar</button>
        </div> 
    )} else if (state.confirmed && !state.deleted) {
      return (
        <>
          <p>Estado de confirmacion</p>
          <button onClick={onDelete} >Sí, eliminar</button>
          <button onClick={onReset} >No, mantener</button>
        </>
      )
    } else {
      return (
        <>
          <p>Eliminado con exito</p>
          <button onClick={onReset} >Reestablecer</button>
        </>
      )
    }
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
}

const reducerSwitch = (state, action) => {
  switch (action.type) {
      case actionTypes.error:
        return {
          ...state,
          error: true,
          loading: false,
        };
      case actionTypes.check:
        return {
          ...state,
          loading: true,
        };
      case actionTypes.confirm:
        return {
          ...state,
          error: false,
          loading: false,
          confirmed: true,
        };
      case actionTypes.delete:
        return {
          ...state,
          deleted: true,
        };
      case actionTypes.reset:
        return {
          ...state,
          confirmed: false,
          deleted: false,
          value: '',
        };
      case actionTypes.write:
        return {
          ...state,
          value: action.payload,
        };
      default:
        return {
          ...state,
        };
  };
};



// const reducer = (state, action) => {
// }

  // const reducerIf = (state, action) => {
  //   if (action.type === 'ERROR') {
  //       return {
  //           ...state,
  //           error: true,
  //           loading: false,
  //       };
  //   } else if (action.type === 'CHECK') {
  //       return {
  //           ...state,
  //           loading: true,
  //       };
  //   } else {
  //       return {
  //           ...state,
  //       };
  //   }
  // };

  // const reducerObject = (state) => ({
  //   'ERROR': {
  //       ...state,
  //       error: true,
  //       loading: false,
  //     },
  //   'CHECK' : {
  //       ...state,
  //       loading: true,
  //     },
  // });


  // const reducer = (state, action) => {
  //   if (reducerObject(state)[action.type]) {
  //       return reducerObject(state)[action.type];
  //   } else {
  //       return state;
  //   }
  // }


  export {UseReducer};