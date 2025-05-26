


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
//   message: ''
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.status = 'loginStart';
//       state.message = '';
//     },
//     loginSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.status = 'success';
//       state.message = 'Login successful!';
//     },
//     loginFailure: (state, action) => {
//       state.currentUser = null;
//       state.status = 'error';
//       state.message = action.payload;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.status = 'idle';
//       state.message = 'You have logged out.';
//     }
//   }
// });

// export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
// export default userSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
//   status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
//   message: '',
//   role: null
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.status = 'loginStart';
//       state.message = '';
//     },
//    loginSuccess: (state, action) => {
//       state.currentUser = action.payload.user;
//       state.status = 'success';
//       state.message = 'Login successful!';
//       state.role = action.payload.role;  // <-- קבל תפקיד מה payload
//       localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
//       localStorage.setItem('userRole', action.payload.role);  // שומר גם את התפקיד
//     },
//     loginFailure: (state, action) => {
//       state.currentUser = null;
//       state.status = 'error';
//       state.message = action.payload;
//        state.role = null;
//     },
//     logout: (state) => {
//  state.currentUser = null;
//       state.status = 'idle';
//       state.message = 'You have logged out.';
//       state.role = null;
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('userRole');
// },
// setUserRole: (state, action) => {
//       state.role = action.payload;
//       localStorage.setItem('userRole', action.payload);
//     }
//   }
// });

// export const { loginStart, loginSuccess, loginFailure, logout,setUserRole  } = userSlice.actions;
// export default userSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
//   status: 'idle',
//   message: '',
//   role: localStorage.getItem('userRole') || null
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.status = 'loginStart';
//       state.message = '';
//     },
//     loginSuccess: (state, action) => {
//       state.currentUser = action.payload.user;
//       state.status = 'success';
//       state.message = 'Login successful!';
//       state.role = action.payload.role;
//       localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
//       localStorage.setItem('userRole', action.payload.role);
//     },
//     loginFailure: (state, action) => {
//       state.currentUser = null;
//       state.status = 'error';
//       state.message = action.payload;
//       state.role = null;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.status = 'idle';
//       state.message = 'You have logged out.';
//       state.role = null;
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('userRole');
//     },
//     setUserRole: (state, action) => {
//       state.role = action.payload;
//       if (action.payload) {
//         localStorage.setItem('userRole', action.payload);
//       } else {
//         localStorage.removeItem('userRole');
//       }
//     }
//   }
// });

// export const { loginStart, loginSuccess, loginFailure, logout, setUserRole } = userSlice.actions;
// export default userSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

// פונקציה בטוחה לקריאת localStorage
const safeJSONParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item || item === "undefined" || item === "null") return null;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return null;
  }
};
const initialState = {
  currentUser: safeJSONParse('currentUser'),
  status: 'idle',
  message: '',
  role: localStorage.getItem('userRole') || null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loginStart';
      state.message = '';
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.status = 'success';
      state.message = 'Login successful!';
      state.role = action.payload.role;
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
      localStorage.setItem('userRole', action.payload.role);
    },
    loginFailure: (state, action) => {
      state.currentUser = null;
      state.status = 'error';
      state.message = action.payload;
      state.role = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.status = 'idle';
      state.message = 'You have logged out.';
      state.role = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
        state.isLoggedIn = false;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
      if (action.payload) {
        localStorage.setItem('userRole', action.payload);
      } else {
        localStorage.removeItem('userRole');
      }
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUserRole
} = userSlice.actions;

export default userSlice.reducer;
