const baseUrl = "https://62a694e897b6156bff7bc30e.mockapi.io/api/teachers";

function apiGetteacher(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {
        hoTen: search // products?name = "Xiaomi"
    },
  });
}
function addTeacherapi(teacher) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: teacher,
  });
}
function apideleteTeacher(teacherId) {
  return axios({
    url: `${baseUrl}/${teacherId}`,
    method: "DELETE",
  });
}
function apigetDetail(teacherId) {
  return axios({
    url: `${baseUrl}/${teacherId}`,
    method: "GET",
  });
}
function apiUpdateProduct(teacher){
    return axios({
        url:`${baseUrl}/${teacher.id}`,
        data: teacher,
        method: "PUT" //PUT là cập nhật
    })
}
