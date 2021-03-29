import { useEffect, useState } from "react";
import _, { isArray, isEqual, isObject, transform } from "lodash";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";
import { Base64 } from "js-base64";
import { logToConsole } from "utils/logging";


export const getDBIdFromGraphqlId = (graphqlId, schema) => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr[1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr[2], 10);
};

export const generateProductUrl = (id, name) =>
  `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id, name) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id, name) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\\-]+/g, "") // Remove all non-word chars
    .replace(/\\-\\-+/g, "-"); // Replace multiple - with single -

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const customFilter = (fn, a) => {
  const f = []; //final
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
};
/**
 * @func curry
 *filter an arr of obj
 *
 * @typedef{(e: object) => boolean} filterFnObjs
 * @param {filterFnObjs} fn
 * return {(a: object[]) => object[]}
 */
export const filterObjs = (fn) => (a) =>
  // eslint-disable-next-line no-undef
  throwIfNotArrOfObjs(a) || customFilter(fn, a);

export const objDiff = (originalObject, newObject) => {
  const changes = (newObject, originalObject) => {
    let arrayIndexCounter = 0;
    return transform(newObject, (result, value, key) => {
      if (!isEqual(value, originalObject[key])) {
        let resultKey = isArray(originalObject) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(originalObject[key])
            ? changes(value, originalObject[key])
            : value;
        if (originalObject.id) {
          result["id"] = originalObject.id;
        }
        if (originalObject.question) {
          result["question"] = originalObject.question;
        }

        // result["id"] =  Object.prototype.valueOf.arguments(originalObject, "id");
      }
    });
  };
  return changes(newObject, originalObject);
};

export const toFormData = (obj, form, namespace) => {
  logToConsole(obj);
  let fd = form || new FormData();
  let formKey;

  if (obj && obj.new) {
    let reducedObj;
    if (obj.old) {
      let diff = objDiff(obj.old, obj.new);

      reducedObj = diff;
    } else {
      reducedObj = obj.new;
    }

    for (let property in reducedObj) {
      if (reducedObj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        if (reducedObj[property] instanceof Date) {
          fd.append(formKey, reducedObj[property].toISOString());
        } else if (
          typeof reducedObj[property] === "object" &&
          !(reducedObj[property] instanceof File)
        ) {
          toFormData(reducedObj[property], fd, formKey);
        } else {
          fd.append(formKey, reducedObj[property]);
        }
      }
    }
  } else {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          toFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
  }

  return fd;
};
export const useTimer = (seconds) => {
  const [counter, setCounter] = useState(seconds ? seconds : 0);
  // Third Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return counter;
};

export const normalizeErrors = (errors) => {
  if (typeof errors !== "object") return null;
  return Object.keys(errors).reduce((acc, val) => {
    const oB = (values, number) => {
      if (values || number) {
        const check = values + "[" + number + "].message";
        return check;
      }
      return null;
    };
    acc[val] = _.get(errors, oB(val, 0), null);
    return acc;
  }, {});
};

export const formatError = (error) =>
  error && error[0].toUpperCase() + error.slice(1);

export const makeSecretKey = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const hashPassword = async (secret) => {
  const secretKey = makeSecretKey(20);

  // Encrypt
  var ciphertext = AES.encrypt(secret, secretKey).toString();
  addToLocalStorageObject("darasa_auth_profile", "hash", secretKey);
  addToLocalStorageObject("darasa_auth_profile", "secret", makeSecretKey(8));
  addToLocalStorageObject("darasa_auth_profile", "key", ciphertext);
};
export const unhashPassword = (secret) => {
  if (localStorage.getItem("darasa_auth_profile") === null) {
    var noText = "";
    return noText;
  } else if (
    JSON.parse(localStorage.getItem("darasa_auth_profile")).key !== undefined
  ) {
    const profileData = JSON.parse(localStorage.getItem("darasa_auth_profile"));
    const ciphertext = profileData.key;
    const secretKey = profileData.hash;

    // Decrypt
    var bytes = AES.decrypt(ciphertext, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    var profile = JSON.parse(localStorage.darasa_auth_profile || {}); //read and convert to object
    var delKey = "key"; //key to remove
    var delHash = "hash"; //key to remove
    var delSecret = "secret"; //key to remove
    if (profile[delKey] || profile[delHash] || profile[delSecret]) {
      //check if key exists
      delete profile[delKey]; //remove the key from object
      delete profile[delHash]; //remove the key from object
      delete profile[delSecret]; //remove the key from object
    }
    localStorage.darasa_auth_profile = JSON.stringify(profile); //save it back
    return originalText;
  } else {
    return noText;
  }
};
/**
 * Add an item to a local storage string
 * @param  {String} name      The localStorage() key
 * @param  {String} value     The localStorage() value
 * @param  {String} delimiter The delimiter to use to separate items
 */
export const addToLocalStorageString = function (name, value, delimiter) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, use the value by itself
  // Otherwise, add the new value to it
  var data = existing ? existing + delimiter + value : value;

  // Save back to localStorage
  localStorage.setItem(name, data);
};

// Example
// addToLocalStorageString('myFavoriteSandwich', 'tuna', ' and ');

/**
 * Add an item to a localStorage() array
 * @param {String} name  The localStorage() key
 * @param {String} value The localStorage() value
 */
export const addToLocalStorageArray = function (name, value) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? existing.split(",") : [];

  // Add new data to localStorage Array
  existing.push(value);

  // Save back to localStorage
  localStorage.setItem(name, [existing.toString()]);
  // localStorage.setItem(name, JSON.stringify(existing));
};
export const addArrayToLocalStorage = function (name, arr) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Add new data to localStorage Array
  existing = existing ? existing.concat(arr) : arr;

  // Save back to localStorage
  // localStorage.setItem(name, existing);
  localStorage.setItem(name, JSON.stringify(existing));
};

/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
export const addToLocalStorageObject = function (name, key, value) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};

/**
 * Add an object to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {Object} obj   The localStorage() value object key + value
 */
export const addObjectToLocalStorageObject = function (name, obj) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  let profile = {};
  existing = { ...profile, ...obj };
  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};

export const millisecondsToDaysHoursMinutesSeconds = (milliSeconds) => {
  var milliseconds, days, hours, minutes, seconds;

  if (milliSeconds > 0) {
    milliseconds = milliSeconds;
    days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    if (days < 0) {
      days = 0;
    }
    milliseconds -= days * 24 * 60 * 60 * 1000;

    hours = Math.floor(milliseconds / (60 * 60 * 1000));
    if (hours < 0) {
      hours = 0;
    }
    milliseconds -= hours * 60 * 60 * 1000;

    minutes = Math.floor(milliseconds / (60 * 1000));
    if (minutes < 0) {
      minutes = 0;
    }
    milliseconds -= minutes * 60 * 1000;

    seconds = Math.floor(milliseconds / 1000);
    if (seconds < 0) {
      seconds = 0;
    }
  } else {
    days = hours = minutes = seconds = 0;
  }

  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
};

/**
 * Splits a Pascal-Case word into individual words separated by spaces.
 * @param {Object} word
 * @returns {String}
 */
export function splitPascalCase(word) {
  var wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
  return word.match(wordRe).join(" ");
}

/**
 * Splits a camelCase or PascalCase word into individual words separated by spaces.
 * @param {Object} word
 * @returns {String}
 */
export function splitCamelCase(word) {
  var output,
    i,
    l,
    capRe = /[A-Z]/;
  if (typeof word !== "string") {
    throw new Error('The "word" parameter must be a string.');
  }
  output = [];
  for (i = 0, l = word.length; i < l; i += 1) {
    if (i === 0) {
      output.push(word[i].toUpperCase());
    } else {
      if (i > 0 && capRe.test(word[i])) {
        output.push(" ");
      }
      output.push(word[i]);
    }
  }
  return output.join("");
}

/** Splits a camel-case or Pascal-case variable name into individual words.
 * @param {string} s
 * @returns {string[]}
 */
export function splitWords(s) {
  var re,
    match,
    output = [];
  // re = /[A-Z]?[a-z]+/g
  re = /([A-Za-z]?)([a-z]+)/g;

  /*
	matches example: "oneTwoThree"
	["one", "o", "ne"]
	["Two", "T", "wo"]
	["Three", "T", "hree"]
	*/

  match = re.exec(s);
  while (match) {
    // output.push(match.join(""));
    output.push([match[1].toUpperCase(), match[2]].join(""));
    match = re.exec(s);
  }

  return output;
}

export const apiErrorHandler = (error) => {
  try {
    if (!error.response) {
      return "Error: Network Error";
    } else if (error.response.data) {
      const erd = error.response.data;
      if (erd.detail) {
        if (erd.detail === "Invalid token.") {
          return "Invalid Token. Please re-login.";
        }
        return erd.detail;
      }
      if (erd[0]) return erd[0];
      const key = Object.keys(erd)[0];
      const errorString = erd[key][0];
      if (["non_field_errors", "detail"].indexOf(key) >= 0) {
        return errorString;
      }
      const errorField = String(key).replace("_", " ");
      return (
        errorField.charAt(0).toUpperCase() +
        errorField.substring(1) +
        ": " +
        errorString
      );
    }
  } catch (error) {
    logToConsole(error);
    return "Something wrong happened. Please report this.";
  }
};
