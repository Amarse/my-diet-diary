import './diary-form.modules.scss';
// import 'react-quill/dist/quill.snow.css';
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { DiaryContext } from 'centext/diary.context.js';
import { useFirebaseStore } from 'hooks/useStore.js';
import { v4 as uuidv4 } from 'uuid';

const DiaryForm = ({ uid }) => {
  const openHandler = useContext(DiaryContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const [date, setDate] = useState(openHandler.openState.date);
  const { addDocument, response } = useFirebaseStore('diary');
  const fileInputRef = useRef();

  useEffect(() => {
    if (response.success) {
      setTitle('');
      setContent('');
    }
  }, [response.success]);

  const onChange = useCallback((event) => {
    console.log(event.target.id);
    event.preventDefault();
    const {
      target: { id, value },
    } = event;

    if (id === 'title') {
      console.log('', id);
      setTitle(value);
    } else if (id === 'content') {
      setContent(value);
    } else if (id === 'date') {
      setDate(value);
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();

    if (!photo) {
      alert('사진을 넣어주세요!! 📷');
    } else {
      addDocument({
        title: title,
        uid: uid,
        date: date,
        photo: photo,
        content: content,
      });
      openHandler.updateOpenHandler(false, '', null);
    }
  };

  const clickFileInput = () => {
    fileInputRef.current.click();
  };

  const fileHandler = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res) => {
      reader.onload = () => {
        setPhoto(reader.result);
        res();
      };
    });
  };


  return (
    <section className='form-container'>
      <form onSubmit={onSubmit}>
        <div className='input-container'>
          <label>오늘은 ? </label>
          <input
            id='title'
            value={title}
            type='text'
            required
            onChange={onChange}
          />
        </div>
        <div className='input-container'>
          <label>날짜 : </label>
          <input id='date' value={date} type='text' onChange={onChange} />
        </div>
        <div className='photo-container'>
          <label htmlFor='file'>show your day </label>
          <input
            id='file'
            type='file'
            ref={fileInputRef}
            accept='image/*'
            required
            onChange={(e) => {
              fileHandler(e.target.files[0]);
            }}
            style={{ display: 'none' }}
          />
          <div
            onClick={clickFileInput}
            style={{
              width: '100px',
              height: '100px',
            }}
          >
            {photo === '' ? (
              <div className='empty-photo' />
            ) : (
              <img
                src={photo}
                alt='uploaded'
                style={{
                  width: '200px',
                  height: '200px',
                }}
              />
            )}
          </div>
        </div>
        <div className='textareaContainer'>
          <label htmlFor='content'>How was your day? </label>
          <textarea
            id='content'
            type='text'
            value={content}
            placeholder='✏️ type your day here'
            required
            onChange={onChange}
          ></textarea>
        </div>

        <div className='buttonContainer'>
          <button type='submit' onClick={onSubmit}>
            🎞 올리기 🎞
          </button>
          <button
            type='button'
            onClick={() => {
              openHandler.updateOpenHandler(false, '', null);
            }}
          >
            ❌ 닫기 ❌
          </button>
        </div>
      </form>
    </section>
  );
};

export default DiaryForm;
