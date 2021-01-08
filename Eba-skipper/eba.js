var SebitBase64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = SebitBase64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\-_\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = SebitBase64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 };
var data = "op=gd";

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
      //console.log(atob(JSON.parse(this.responseText)));
        //console.log(atob(this.responseText.substr(1,this.responseText.length-1)));



data = "op=sd&dm=eyJjbWkuY29yZS5sZXNzb25fbG9jYXRpb24iOnsiZGF0YSI6IiIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXltcXHUwMDAwLVxcdWZmZmZdezAsMjU1fSQifSwiY21pLmNvcmUuZW50cnkiOnsiZGF0YSI6ImFiLWluaXRpbyIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5hYi1pbml0aW8kfF5yZXN1bWUkfF4kIn0sImNtaS5pbnRlcmFjdGlvbnMubi5vYmplY3RpdmVzLm4uaWQiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjpmYWxzZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5cXFN7MSwyNTV9JCJ9LCJjbWkuc3R1ZGVudF9kYXRhLnRpbWVfbGltaXRfYWN0aW9uIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeZXhpdCxtZXNzYWdlJHxeZXhpdCxubyBtZXNzYWdlJHxeY29udGludWUsbWVzc2FnZSR8XmNvbnRpbnVlLG5vIG1lc3NhZ2UkIn0sImNtaS5pbnRlcmFjdGlvbnMubi5jb3JyZWN0X3Jlc3BvbnNlcy5fY291bnQiOnsiZGF0YSI6IjAiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeXFxkKyQifSwiY21pLmNvcmUuc2NvcmUubWluIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5bKy1dP1xcZCsoWy5dKFxcZCspKT8kIn0sImNtaS5pbnRlcmFjdGlvbnMuX2NvdW50Ijp7ImRhdGEiOiIwIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXlxcZCskIn0sImNtaS5jb3JlLnRvdGFsX3RpbWUiOnsiZGF0YSI6IjAwMDA6MDA6MDAuMDAiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeKFswLTldezIsNH0pOihbMC05XXsyfSk6KFswLTldezJ9KShcXC5bMC05XXsxLDJ9KT8kIn0sImNtaS5zdHVkZW50X2RhdGEubWF4X3RpbWVfYWxsb3dlZCI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXihbMC05XXsyLDR9KTooWzAtOV17Mn0pOihbMC05XXsyfSkoXFwuWzAtOV17MSwyfSk_JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4udHlwZSI6eyJkYXRhIjoiIiwicmVhZGFibGUiOmZhbHNlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXnRydWUtZmFsc2UkfF5jaG9pY2UkfF5maWxsLWluJHxebWF0Y2hpbmckfF5wZXJmb3JtYW5jZSR8Xmxpa2VydCR8XnNlcXVlbmNpbmckfF5udW1lcmljJCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4ubGF0ZW5jeSI6eyJkYXRhIjoiIiwicmVhZGFibGUiOmZhbHNlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXihbMC05XXsyLDR9KTooWzAtOV17Mn0pOihbMC05XXsyfSkoXFwuWzAtOV17MSwyfSk_JCJ9LCJjbWkub2JqZWN0aXZlcy5uLnNjb3JlLnJhdyI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4ucmVzdWx0Ijp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6ZmFsc2UsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeY29ycmVjdCR8Xndyb25nJHxedW5hbnRpY2lwYXRlZCR8Xm5ldXRyYWwkfF5bKy1dP1xcZCsoWy5dKFxcZCspKT8kIn0sImNtaS5vYmplY3RpdmVzLm4uc3RhdHVzIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5wYXNzZWQkfF5jb21wbGV0ZWQkfF5mYWlsZWQkfF5pbmNvbXBsZXRlJHxeYnJvd3NlZCR8Xm5vdCBhdHRlbXB0ZWQkIn0sImNtaS5zdHVkZW50X3ByZWZlcmVuY2Uuc3BlZWQiOnsiZGF0YSI6IjAiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il4tPyhbMC05XSspJCJ9LCJjbWkub2JqZWN0aXZlcy5uLmlkIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5cXFN7MSwyNTV9JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4uY29ycmVjdF9yZXNwb25zZXMubi5wYXR0ZXJuIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6ZmFsc2UsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkuY29yZS5zZXNzaW9uX3RpbWUiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjpmYWxzZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il4oWzAtOV17Miw0fSk6KFswLTldezJ9KTooWzAtOV17Mn0pKFxcLlswLTldezEsMn0pPyQifSwiY21pLnN0dWRlbnRfcHJlZmVyZW5jZS5fY2hpbGRyZW4iOnsiZGF0YSI6ImF1ZGlvLCBsYW5ndWFnZSwgc3BlZWQsIHRleHQiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkub2JqZWN0aXZlcy5uLnNjb3JlLm1pbiI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkuc3R1ZGVudF9wcmVmZXJlbmNlLnRleHQiOnsiZGF0YSI6IjAiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il4tPyhbMC05XSspJCJ9LCJjbWkuY29tbWVudHNfZnJvbV9sbXMiOnsicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXltcXHUwMDAwLVxcdWZmZmZdezAsNDA5Nn0kIn0sImNtaS5pbnRlcmFjdGlvbnMuX2NoaWxkcmVuIjp7ImRhdGEiOiJpZCwgb2JqZWN0aXZlcywgdGltZSwgdHlwZSwgY29ycmVjdF9yZXNwb25zZXMsIHdlaWdodGluZywgc3R1ZGVudF9yZXNwb25zZSwgcmVzdWx0LCBsYXRlbmN5IiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXltcXHUwMDAwLVxcdWZmZmZdezAsMjU1fSQifSwiY21pLm9iamVjdGl2ZXMuX2NvdW50Ijp7ImRhdGEiOjIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5cXGQrJCJ9LCJjbWkuY29yZS5zY29yZS5fY2hpbGRyZW4iOnsiZGF0YSI6InJhdywgbWluLCBtYXgiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4uaWQiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjpmYWxzZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5cXFN7MSwyNTV9JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4ud2VpZ2h0aW5nIjp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6ZmFsc2UsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkubGF1bmNoX2RhdGEiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5bXFx1MDAwMC1cXHVmZmZmXXswLDQwOTZ9JCJ9LCJjbWkuY29yZS5fY2hpbGRyZW4iOnsiZGF0YSI6InN0dWRlbnRfaWQsIHN0dWRlbnRfbmFtZSwgbGVzc29uX2xvY2F0aW9uLCBjcmVkaXQsIGxlc3Nvbl9zdGF0dXMsIGVudHJ5LCBzY29yZSwgdG90YWxfdGltZSwgbGVzc29uX21vZGUsIGV4aXQsIHNlc3Npb25fdGltZSIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5bXFx1MDAwMC1cXHVmZmZmXXswLDI1NX0kIn0sImNtaS5jb3JlLmNyZWRpdCI6eyJkYXRhIjoibm8tY3JlZGl0IiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXmNyZWRpdCR8Xm5vLWNyZWRpdCQifSwiY21pLmNvcmUuc3R1ZGVudF9uYW1lIjp7ImRhdGEiOiJUw5xSS0FOLCBLQVNJTSIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5bXFx1MDAwMC1cXHVmZmZmXXswLDI1NX0kIn0sImNtaS5zdHVkZW50X3ByZWZlcmVuY2UubGFuZ3VhZ2UiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXltcXHUwMDAwLVxcdWZmZmZdezAsMjU1fSQifSwiY21pLmludGVyYWN0aW9ucy5uLm9iamVjdGl2ZXMuX2NvdW50Ijp7ImRhdGEiOiIwIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXlxcZCskIn0sImNtaS5jb3JlLnNjb3JlLnJhdyI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkuc3R1ZGVudF9kYXRhLl9jaGlsZHJlbiI6eyJkYXRhIjoibWFzdGVyeV9zY29yZSwgbWF4X3RpbWVfYWxsb3dlZCwgdGltZV9saW1pdF9hY3Rpb24iLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkuc3R1ZGVudF9wcmVmZXJlbmNlLmF1ZGlvIjp7ImRhdGEiOiIwIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeLT8oWzAtOV0rKSQifSwiY21pLmNvcmUubGVzc29uX3N0YXR1cyI6eyJkYXRhIjoiY29tcGxldGVkIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJecGFzc2VkJHxeY29tcGxldGVkJHxeZmFpbGVkJHxeaW5jb21wbGV0ZSR8XmJyb3dzZWQkIn0sImNtaS5jb21tZW50cyI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCw0MDk2fSQifSwiY21pLm9iamVjdGl2ZXMubi5zY29yZS5tYXgiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXlsrLV0_XFxkKyhbLl0oXFxkKykpPyQifSwiY21pLm9iamVjdGl2ZXMubi5zY29yZS5fY2hpbGRyZW4iOnsiZGF0YSI6InJhdywgbWluLCBtYXgiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkuY29yZS5leGl0Ijp7ImRhdGEiOiIiLCJyZWFkYWJsZSI6ZmFsc2UsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJedGltZS1vdXQkfF5zdXNwZW5kJHxebG9nb3V0JHxeJCJ9LCJjbWkuX3ZlcnNpb24iOnsiZGF0YSI6IjMuNCIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5bXFx1MDAwMC1cXHVmZmZmXXswLDQwOTZ9JCJ9LCJjbWkuY29yZS5sZXNzb25fbW9kZSI6eyJkYXRhIjoibm9ybWFsIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXm5vcm1hbCR8XnJldmlldyR8XmJyb3dzZSQifSwiY21pLnN1c3BlbmRfZGF0YSI6eyJkYXRhIjoie1wiY29tcGxldGVkUGFydHNcIjpbMV0sXCJhY3Rpdml0eURhdGFcIjpudWxsLFwidXNlck5hbWVcIjpcIlTDnFJLQU4sIEtBU0lNXCJ9IiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwxNjAwMH0kIn0sImNtaS5jb3JlLnNjb3JlLm1heCI6eyJkYXRhIjoiIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkuc3R1ZGVudF9kYXRhLm1hc3Rlcnlfc2NvcmUiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjp0cnVlLCJ3cml0YWJsZSI6ZmFsc2UsInZhbGlkYXRvciI6Il5bKy1dP1xcZCsoWy5dKFxcZCspKT8kIn0sImNtaS5jb3JlLnN0dWRlbnRfaWQiOnsiZGF0YSI6ImYxNzU4ZjZlNTAxZjYxY2IwNzQxZjRjMTc4ZTNjNDVlIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjpmYWxzZSwidmFsaWRhdG9yIjoiXlxcU3sxLDI1NX0kIn0sImNtaS5vYmplY3RpdmVzLl9jaGlsZHJlbiI6eyJkYXRhIjoiaWQsIHNjb3JlLCBzdGF0dXMiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOmZhbHNlLCJ2YWxpZGF0b3IiOiJeW1xcdTAwMDAtXFx1ZmZmZl17MCwyNTV9JCJ9LCJjbWkuaW50ZXJhY3Rpb25zLm4udGltZSI6eyJkYXRhIjoiIiwicmVhZGFibGUiOmZhbHNlLCJ3cml0YWJsZSI6dHJ1ZSwidmFsaWRhdG9yIjoiXihbMC0yXXsxfVswLTldezF9KTooWzAtNV17MX1bMC05XXsxfSk6KFswLTVdezF9WzAtOV17MX0pKFxcLlswLTldezEsMn0pPyQifSwiY21pLmludGVyYWN0aW9ucy5uLnN0dWRlbnRfcmVzcG9uc2UiOnsiZGF0YSI6IiIsInJlYWRhYmxlIjpmYWxzZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5bXFx1MDAwMC1cXHVmZmZmXXswLDI1NX0kIn0sImNtaS5vYmplY3RpdmVzLjAuaWQiOnsiZGF0YSI6ImVkdWNhdGlvbmFsU2NvcmUiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5cXFN7MSwyNTV9JCJ9LCJjbWkub2JqZWN0aXZlcy4wLnN0YXR1cyI6eyJkYXRhIjoiY29tcGxldGVkIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJecGFzc2VkJHxeY29tcGxldGVkJHxeZmFpbGVkJHxeaW5jb21wbGV0ZSR8XmJyb3dzZWQkfF5ub3QgYXR0ZW1wdGVkJCJ9LCJjbWkub2JqZWN0aXZlcy4wLnNjb3JlLnJhdyI6eyJkYXRhIjoiMTAwIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9LCJjbWkub2JqZWN0aXZlcy4xLmlkIjp7ImRhdGEiOiJ1c2FnZVNjb3JlIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeXFxTezEsMjU1fSQifSwiY21pLm9iamVjdGl2ZXMuMS5zdGF0dXMiOnsiZGF0YSI6ImluY29tcGxldGUiLCJyZWFkYWJsZSI6dHJ1ZSwid3JpdGFibGUiOnRydWUsInZhbGlkYXRvciI6Il5wYXNzZWQkfF5jb21wbGV0ZWQkfF5mYWlsZWQkfF5pbmNvbXBsZXRlJHxeYnJvd3NlZCR8Xm5vdCBhdHRlbXB0ZWQkIn0sImNtaS5vYmplY3RpdmVzLjEuc2NvcmUucmF3Ijp7ImRhdGEiOiIwIiwicmVhZGFibGUiOnRydWUsIndyaXRhYmxlIjp0cnVlLCJ2YWxpZGF0b3IiOiJeWystXT9cXGQrKFsuXShcXGQrKSk_JCJ9fQ%3D%3D&s="+JSON.parse(SebitBase64.decode(this.responseText)).scoId+"&f=false&c=true&us=-1";

const xhrr = new XMLHttpRequest();
xhrr.withCredentials = true;

xhrr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
	  window.location.reload()
  }
});

xhrr.open("POST", "https://ders.eba.gov.tr/ders/TrackingService/api12.jsp");
xhrr.setRequestHeader("cookie", document.cookie);
xhrr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36");
xhrr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhrr.setRequestHeader("accept", "*/*");
xhrr.setRequestHeader("origin", "https://ders.eba.gov.tr");
xhrr.setRequestHeader("referer", "https://ders.eba.gov.tr/ders/proxy/VCollabPlayer_v0.0.729/index.html");
xhrr.setRequestHeader("accept-encoding", "gzip, deflate, br");
xhrr.setRequestHeader("accept-language", "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6");

xhrr.send(data);












  }
});

xhr.open("POST", "https://ders.eba.gov.tr/ders/TrackingService/api12.jsp");
xhr.setRequestHeader("cookie", document.cookie);
xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("accept", "*/*");
xhr.setRequestHeader("origin", "https://ders.eba.gov.tr");
xhr.setRequestHeader("referer", "https://ders.eba.gov.tr/ders/proxy/VCollabPlayer_v0.0.729/index.html");
xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
xhr.setRequestHeader("accept-language", "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6");

xhr.send(data);
