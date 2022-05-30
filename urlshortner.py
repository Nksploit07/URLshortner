import streamlit as st
import requests
import json as json

def urlshort(url):
    # print(url)
    obj={'url':url}
    shorturl= requests.post('https://2ernpy2w3a.execute-api.ap-south-1.amazonaws.com/Prod/URLshortners3',json=obj)
    shorturl=json.loads(shorturl.content)
    # print(shorturl['body'])
    st.write(str(shorturl['body']))

st.title("URL SHORTNER",)
url = st.text_input("")
if st.button(label="Shortner") :
    urlshort(url)


