/**
 * 파일이 입력되는 이벤트를 처리하는 함수
 * 파일이 입력되면 해당 파일명으로 label text를 변경
 * @param input input tag
 * @param labelId label tag의 id
 */
function fileInputEvent(input, labelId) {
    let label = document.getElementById(labelId)
    label.innerText = input.files[0].name
    label.style.color = '#999'
    label.style.backgroundColor = '#fdfdfd'
    label.style.border = '1px solid #ebebeb'
    label.style.borderBottomColor = '#e2e2e2'
    // let x = URL.createObjectURL(input.files[0])
}
