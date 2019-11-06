var app = angular.module('authyDemo', []);

// app.controller('LoginController', function ($scope, $http, $window) {

//     $scope.setup = {};

//     $scope.login = function () {
//         $http.post('/api/login', $scope.setup)
//             .success(function (data, status, headers, config) {
//                 console.log("Login success: ", data);
//                 $window.location.href = $window.location.origin + "/2fa";
//             })
//             .error(function (data, status, headers, config) {
//                 console.error("Login error: ", data);
//                 alert("Error logging in.  Check console");
//             });
//     };
// });

app.controller('PhoneVerificationController', function ($scope, $http, $window, $timeout) {

    $scope.setup = {
        via: "sms",
        locale: "en"
    };

    $scope.view = {
        start: true,
        code: false
    };

    $scope.info = false;
    $scope.disabled = false;

    /**
     * Initialize Phone Verification
     */
    $scope.startVerification = function () {
        $http.post('/api/verification/start', $scope.setup)
            .success(function (data, status, headers, config) {
                $scope.view.code = true;
                console.log("Verification started: ", data);
            })
            .error(function (data, status, headers, config) {
                console.error("Phone verification error: ", data);
            });
    };

    /**
     * Verify phone token
     */
    $scope.verifyToken = function () {
        $http.post('/api/verification/verify', $scope.setup)
            .success(function (data, status, headers, config) {
                console.log("Phone Verification Success success: ", data);
                $window.location.href = $window.location.origin + "/verified";
            })
            .error(function (data, status, headers, config) {
                console.error("Verification error: ", data);
                alert("Error verifying the token.  Check console for details.");
            });
    };

    $scope.logout = function () {
        $window.location.href = $window.location.origin;
    };
});

