main();
function main() {
  apiGetteacher()
    .then(function (result) {
      // console.log(result.data);
      const teachers = result.data;
      for (var i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        teachers[i] = new Teacher(
          teacher.id,
          teacher.taiKhoan,
          teacher.hoTen,
          teacher.matKhau,
          teacher.email,
          teacher.loaiND,
          teacher.ngonNgu,
          teacher.moTa,
          teacher.hinhAnh
        );
      }
      //   console.log();

      // console.log(teachers);

      display(teachers);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function display(teachers) {
  let html = "";
  for (var i = 0; i < teachers.length; i++) {
    const teacher = teachers[i];
    // console.log(teacher);

    html += `<tr>
        <td>${i + 1}</td>
        <td>${teacher.taiKhoan}</td>
        <td>${teacher.matKhau}</td>
        
        <td>${teacher.hoTen}</td>
        
        <td>${teacher.email}</td>
        <td>${teacher.ngonNgu}</td>
        <td>${teacher.loaiND}</td>
        <td>
            <button class = "btn btn-primary" data-toggle="modal" data-target="#myModal"
            data-type = "update"
            data-id = "${teacher.id}"
            >
            Cập nhật</button>
            <button class = "btn btn-danger"
            data-type = "delete"
            data-id = "${teacher.id}"
            >
            Xóa
            </button>
        </td>
    </tr>`;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  document.getElementById("TaiKhoan").disabled = false;
  // thay đổi text của modeal heading
  document.querySelector(".modal-title").innerHTML = "thêm sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class = "btn btn-success " data-type = "add" >thêm</button>
      <button class = "btn btn-secondary"
       data-toggle="modal" 
       data-target="#myModal"
       >
        hủy
         </button>`;
}
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
function handleSubmit(evt) {
  const type = evt.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addTeacher();
      break;
    case "update":
      updateTeacher();
    default:
      break;
  }
}
function updateTeacher() {
  const id = document.getElementById("MaTeacher").value; // hidden input
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const loaiNguoiDung = document.getElementById("loaiNguoiDung").value;
  const loaiNgonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;
  const hinhAnh = document.getElementById("HinhAnh").value;

  var isValid = validationUpdate();

  if (!isValid) {
    alert("vui lòng nhập vào các giá trị");
    return;
  }
  const teacher = new Teacher(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );
  //   console.log(teacher)
  apiUpdateProduct(teacher)
    .then(function (result) {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
  restform();
}
function addTeacher() {
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const loaiNguoiDung = document.getElementById("loaiNguoiDung").value;
  const loaiNgonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;
  const hinhAnh = document.getElementById("HinhAnh").value;

  var isValid = validation();

  if (!isValid) {
    alert("vui lòng nhập vào các giá trị");
    return;
  }
  const teacher = new Teacher(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );
  addTeacherapi(teacher)
    .then(function (result) {
      console.log(result.data);
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
  restform();
}
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleaction);
function handleaction(evt) {
  const type = evt.target.getAttribute("data-type");
  const id = evt.target.getAttribute("data-id");
  switch (type) {
    case "delete":
      deleteTeacher(id);
      break;
    case "update":
      showAddModalup(id);
    default:
      break;
  }
}
function showAddModalup(teacherId) {
  document.querySelector(".modal-title").innerHTML = "cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class = "btn btn-success " data-type = "update" >cập nhật</button>
      <button class = "btn btn-secondary"
       data-dismiss="modal" 
       
       >
        hủy
         </button>`;
  apigetDetail(teacherId).then(function (result) {
    const teacher = result.data;
    document.getElementById("MaTeacher").value = teacher.id;
    document.getElementById("TaiKhoan").value = teacher.taiKhoan;
    document.getElementById("TaiKhoan").disabled = true;
    document.getElementById("HoTen").value = teacher.hoTen;
    document.getElementById("MatKhau").value = teacher.matKhau;
    document.getElementById("Email").value = teacher.email;
    document.getElementById("loaiNguoiDung").value = teacher.loaiND;
    document.getElementById("loaiNgonNgu").value = teacher.ngonNgu;
    document.getElementById("MoTa").value = teacher.moTa;
    document.getElementById("HinhAnh").value = teacher.hinhAnh;
  });
}
function deleteTeacher(teacherId) {
  apideleteTeacher(teacherId)
    .then(function (result) {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}
document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(evt) {
  if (evt.key !== "Enter") return;
  var value = evt.target.value;
  apiGetteacher(value)
    .then(function (result) {
      const teachers = result.data;
      console.log(teachers);
      for (var i = 0; i < teachers.length; i++) {
        const teacher = teachers[i];
        teachers[i] = new Teacher(
          teacher.id,
          teacher.taiKhoan,
          teacher.hoTen,
          teacher.matKhau,
          teacher.email,
          teacher.loaiND,
          teacher.ngonNgu,
          teacher.moTa,
          teacher.hinhAnh
        );
      }
      //   console.log();

      console.log(teachers);
      display(teachers);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
function validation() {
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const loaiNguoiDung = document.getElementById("loaiNguoiDung").value;
  const loaiNgonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  
  // console.log(result)
  var isValid = true;
  // const checkAccountzz = findAccount(teachers, taiKhoan);
  if (!isRequired(taiKhoan)) {
    isValid = false;
    document.getElementById("sptaiKhoan").style.display = "block";
    document.getElementById("sptaiKhoan").innerHTML =
      "Tên tài khoản không được để trống";
    // } else if (taiKhoan === checkAccountzz) {
    //   isValid = false;
    //   document.getElementById("sptaiKhoan").style.display = "block";
    //   document.getElementById("sptaiKhoan").innerHTML =
    //     "tên tài khoản đã được sử dụng";
  } else {
    document.getElementById("sptaiKhoan").innerHTML = "";
  }

  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(hoTen)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("sphoTen").style.display = "block";
    document.getElementById("sphoTen").innerHTML = "họ tên không được để trống";
  } else if (!letters.test(hoTen)) {
    isValid = false;
    document.getElementById("sphoTen").style.display = "block";
    document.getElementById("sphoTen").innerHTML = "Họ và tên không đúng kí tự";
  } else {
    document.getElementById("sphoTen").innerHTML = "";
  }

  var pwPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
  if (!isRequired(matKhau)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spmatKhau").style.display = "block";
    document.getElementById("spmatKhau").innerHTML =
      "mật khẩu không được để trống";
  } else if (!pwPattern.test(matKhau)) {
    isValid = false;
    document.getElementById("spmatKhau").style.display = "block";
    document.getElementById("spmatKhau").innerHTML =
      " mật khẩu không đúng kí tự (6-8 kí tự ít nhất 1 viết hoa 1 viết thường 1 kí tự đặc biệt)";
  } else {
    document.getElementById("spmatKhau").innerHTML = "";
  }

  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spemail").style.display = "block";
    document.getElementById("spemail").innerHTML = "email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("spemail").style.display = "block";
    document.getElementById("spemail").innerHTML = "email không đúng kí tự";
  } else {
    document.getElementById("spemail").innerHTML = "";
  }
  if (!isRequired(hinhAnh)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spimage").style.display = "block";
    document.getElementById("spimage").innerHTML =
      "hình ảnh không được để trống";
  } else {
    document.getElementById("spimage").innerHTML = "";
  }
  if (loaiNguoiDung === "Chọn loại người dùng") {
    isValid = false;
    document.getElementById("spND").style.display = "block";
    document.getElementById("spND").innerHTML = "chọn loại người dùng";
  } else {
    document.getElementById("spND").innerHTML = "";
  }
  if (loaiNgonNgu === "Chọn loại ngôn ngữ") {
    isValid = false;
    document.getElementById("spNN").style.display = "block";
    document.getElementById("spNN").innerHTML = "chọn loại ngôn ngữ";
  } else {
    document.getElementById("spNN").innerHTML = "";
  }
  if (!isRequired(moTa)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spmoTa").style.display = "block";
    document.getElementById("spmoTa").innerHTML = "mô tả không được để trống";
  } else if (!minLenght(moTa, 60)) {
    isValid = false;
    document.getElementById("spmoTa").style.display = "block";
    document.getElementById("spmoTa").innerHTML = "mô tả không vượt 60 kí tự";
  } else {
    document.getElementById("spmoTa").innerHTML = "";
  }

  return isValid;
}
function validationUpdate() {
  const taiKhoan = document.getElementById("TaiKhoan").value;
  // document.getElementById("TaiKhoan").disabled = true
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const loaiNguoiDung = document.getElementById("loaiNguoiDung").value;
  const loaiNgonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;
  const hinhAnh = document.getElementById("HinhAnh").value;

  // console.log(result)
  var isValid = true;
  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(hoTen)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("sphoTen").style.display = "block";
    document.getElementById("sphoTen").innerHTML = "họ tên không được để trống";
  } else if (!letters.test(hoTen)) {
    isValid = false;
    document.getElementById("sphoTen").style.display = "block";
    document.getElementById("sphoTen").innerHTML = "Họ và tên không đúng kí tự";
  } else {
    document.getElementById("sphoTen").innerHTML = "";
  }

  var pwPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
  if (!isRequired(matKhau)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spmatKhau").style.display = "block";
    document.getElementById("spmatKhau").innerHTML =
      "mật khẩu không được để trống";
  } else if (!pwPattern.test(matKhau)) {
    isValid = false;
    document.getElementById("spmatKhau").style.display = "block";
    document.getElementById("spmatKhau").innerHTML =
      " mật khẩu không đúng kí tự (6-8 kí tự ít nhất 1 viết hoa 1 viết thường 1 kí tự đặc biệt)";
  } else {
    document.getElementById("spmatKhau").innerHTML = "";
  }

  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spemail").style.display = "block";
    document.getElementById("spemail").innerHTML = "email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("spemail").style.display = "block";
    document.getElementById("spemail").innerHTML = "email không đúng kí tự";
  } else {
    document.getElementById("spemail").innerHTML = "";
  }
  if (!isRequired(hinhAnh)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spimage").style.display = "block";
    document.getElementById("spimage").innerHTML =
      "hình ảnh không được để trống";
  } else {
    document.getElementById("spimage").innerHTML = "";
  }
  if (loaiNguoiDung === "Chọn loại người dùng") {
    isValid = false;
    document.getElementById("spND").style.display = "block";
    document.getElementById("spND").innerHTML = "chọn loại người dùng";
  } else {
    document.getElementById("spND").innerHTML = "";
  }
  if (loaiNgonNgu === "Chọn loại ngôn ngữ") {
    isValid = false;
    document.getElementById("spNN").style.display = "block";
    document.getElementById("spNN").innerHTML = "chọn loại ngôn ngữ";
  } else {
    document.getElementById("spNN").innerHTML = "";
  }
  if (!isRequired(moTa)) {
    // kiểm tr nếu isREquired là false
    isValid = false;
    document.getElementById("spmoTa").style.display = "block";
    document.getElementById("spmoTa").innerHTML = "mô tả không được để trống";
  } else if (!minLenght(moTa, 60)) {
    isValid = false;
    document.getElementById("spmoTa").style.display = "block";
    document.getElementById("spmoTa").innerHTML = "mô tả không vượt 60 kí tự";
  } else {
    document.getElementById("spmoTa").innerHTML = "";
  }

  return isValid;
}

function minLenght(value, limit) {
  if (value.length > limit) {
    return false;
  }
  return true;
}
function restform() {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("MoTa").value = "";
  document.getElementById("HinhAnh").value = "";

  $("#myModal").modal("hide");
}

// const sos = () => {
//   const status = axios({
//     url: "https://62a694e897b6156bff7bc30e.mockapi.io/api/teachers",
//     method: "GET",
//   })
//     .then(getDataSuccess)
//     .catch(getDateError);
//   function getDataSuccess(respone) {
//     console.log(respone.data);
//     var teachers = respone.data;
//     return teachers;
//   }
//   function getDateError(error) {
//     console.log(error);
//   }
//   return status
// };

// }
// const sos = () => {
//   const status = axios({
//     url: "https://62a694e897b6156bff7bc30e.mockapi.io/api/teachers",
//     method: "GET",
//   })
//     .then(getDataSuccess)
//     .catch(getDateError);
//   function getDataSuccess(respone) {
//     console.log(respone.data);
//     var teachers = respone.data;
//     return teachers;
//   }
//   function getDateError(error) {
//     console.log(error);
//   }
//   console.log(status)
// };
