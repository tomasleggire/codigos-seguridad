import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) {

    const [state, dispatch] = React.useReducer(reducerSwitch, initialState);
  
    React.useEffect(() => {
        console.log('Empezando el efecto');
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion');
                if (state.value === SECURITY_CODE) {
                  dispatch({
                    type: 'CONFIRM',
                  })
                } else {
                  dispatch({
                    type: 'ERROR',
                  })
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
              dispatch({
                type: 'WRITE',
                payload: e.target.value,
              })
              // onWrite(e.target.value);
            }}
          />
          <button
            onClick={() => {
              dispatch({
                type: 'CHECK',
              })
              //onCheck();
            }}
          >Comprobar</button>
        </div> 
    )} else if (state.confirmed && !state.deleted) {
      return (
        <>
          <p>Estado de confirmacion</p>
          <button
            onClick={() => {
              dispatch({
                type: 'DELETE',
              })
              //onDelete();
            }}
          >Sí, eliminar</button>
          <button
            onClick={() => {
              dispatch({
                type: 'RESET',
              })
              //onReset();
            }}
          >No, mantener</button>
        </>
      )
    } else {
      return (
        <>
          <p>Eliminado con exito</p>
          <button
            onClick={() => {
              dispatch({
                type: 'RESET',
              })
              //onReset();
            }}
          >Reestablecer</button>
        </>
      )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
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


  const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR':
          return {
            ...state,
            error: true,
            loading: false,
          };
        case 'CHECK':
          return {
            ...state,
            loading: true,
          };
        case 'CONFIRM':
          return {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          };
        case 'DELETE':
          return {
            ...state,
            deleted: true,
          };
        case 'RESET':
          return {
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
          };
        case 'WRITE':
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