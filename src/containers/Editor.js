import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module';
import Label from 'bloomer/lib/elements/Form/Label';
import Input from 'bloomer/lib/elements/Form/Input';
import Field from 'bloomer/lib/elements/Form/Field/Field';
import Columns from 'bloomer/lib/grid/Columns';
import Column from 'bloomer/lib/grid/Column';
import TextArea from 'bloomer/lib/elements/Form/TextArea';
import Button from 'bloomer/lib/elements/Button';
import Control from 'bloomer/lib/elements/Form/Control';

import Modal from 'bloomer/lib/components/Modal/Modal';
import ModalBackground from 'bloomer/lib/components/Modal/ModalBackground';
import ModalCardHeader from 'bloomer/lib/components/Modal/Card/ModalCardHeader';
import ModalCard from 'bloomer/lib/components/Modal/Card/ModalCard';
import ModalCardTitle from 'bloomer/lib/components/Modal/Card/ModalCardTitle';
import Delete from 'bloomer/lib/elements/Delete';
import ModalCardBody from 'bloomer/lib/components/Modal/Card/ModalCardBody';
import ModalCardFooter from 'bloomer/lib/components/Modal/Card/ModalCardFooter';
import Content from 'bloomer/lib/elements/Content';

Quill.register('modules/ImageResize', ImageResize);

// Can ignore, just sets up the toolbar and extends with extra element
// TODO: Can we use the JSON format for adding a new element?
const CustomToolbar = ({handleRaw}) => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      </select>
      <select className="ql-font" defaultValue={""} onChange={e => e.persist()}>
      </select>
      <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <select className="ql-color">
      </select>
      <select className="ql-background">
      </select>      
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="sub" />
      <button className="ql-script" value="super"/>
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
      <button className="ql-code-block" />      
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered"/>
      <button className="ql-list" value="bullet"/>
      <button className="ql-indent" value="+1"/>
      <button className="ql-indent" value="-1"/>
    </span>
    <span className="ql-formats">
      <select className="ql-align"/>
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-Raw" onClick={handleRaw}>Raw</button>
    </span>
  </div>
);

// Raw component idea credit: https://codepen.io/alexkrolick/pen/XgaVVX?editors=0110
class Editor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: this.props.initialBody || '<p></p>',
      titleText: this.props.initialTitle || '',
      slug: this.props.initialSlug || '',
      description: this.props.initialDescription || '',
      intro: '',
      deleteWarn: false,
      showRaw: false,
    };
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeRaw = this.handleChangeRaw.bind(this);
    this.handleClickShowRaw = this.handleClickShowRaw.bind(this)
    this.handleChangeSlug = this.handleChangeSlug.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);    
    this.submit = this.submit.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
  }

  handleChangeBody(html, delta, source, editor) {
    this.setState({ editorHtml: html, intro: editor.getText(0, 300) });
  }

  handleChangeRaw(html) {
  	this.setState({ rawHtml: html })
  }

  handleChangeTitle(e) {
    this.setState({titleText: e.target.value});
  }

  handleChangeSlug(e) {
    this.setState({ slug: e.target.value })
  }

  submit(e) {
    // state and first few characters of unformatted text
    this.props.handleSubmit(this.state);
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value })
  }

  handleClickShowRaw () {
    const isEditingRaw = this.state.showRaw;
    this.setState({ showRaw: !isEditingRaw })
    this.syncViews(isEditingRaw)
  }

  syncViews (fromRaw) {
    if (fromRaw) {
      this.setState({ editorHtml: this.state.rawHtml })
    }
    else {
      this.setState({ rawHtml: this.state.editorHtml })
    }
  }

  toggleWarning() {
    this.setState({ deleteWarn: !this.state.deleteWarn })
  }

  render() {
    return (
<div>
<form className="text-editor">
  <Columns isMultiline>
        <Column size='1/2'>
        <Field>
          <Label htmlFor="title" >Title: </Label>
          <Input type="text" value={this.state.titleText} onChange={this.handleChangeTitle} id="title" name="title" />
        </Field>
        </Column>
        <Column>
        <Field>
          <Label htmlFor="slug">Slug: </Label>
          <Input type="text" value={this.state.slug} onChange={this.handleChangeSlug} id="slug" name="slug" />
        </Field>
        </Column>
        <Column isSize='full'>
        <Field>        
          <Label htmlFor="slug">Description: </Label>
          <Input type="text" value={this.state.description} onChange={this.handleChangeDescription} id="description" name="description" />
        </Field>          
        </Column>
        <Column isSize='full'>
          <Label htmlFor="body">Body: </Label>
          <CustomToolbar handleRaw={this.handleClickShowRaw}/>
          <ReactQuill
            id="body"
            style={this.state.showRaw ? {display: "none"} : {display: "block"}}
            value={this.state.editorHtml}
            onChange={this.handleChangeBody}
            modules={Editor.modules}
            theme="snow"
          />
          <TextArea
              style={this.state.showRaw ? {display: "block"} : {display: "none"}}
              className="raw-editor"
              onChange={(e) => this.handleChangeRaw(e.target.value)}
              value={this.state.rawHtml}
            />
          </Column>
  </Columns>
        <Field isGrouped>
          <Control>
            <Button type="submit" onClick={this.submit}>{this.props.submitText}</Button>
          </Control>
          {this.props.delete ? <Control><Button isColor='danger' onClick={this.toggleWarning}>Delete</Button></Control> : null}
        </Field>
</form>

<Modal isActive={this.state.deleteWarn}>
<ModalBackground onClick={this.toggleWarning} />
<ModalCard>
        <ModalCardHeader>
          <ModalCardTitle>Delete?</ModalCardTitle>
          <Delete onClick={this.toggleWarning} />
        </ModalCardHeader>
        <ModalCardBody>
        <Content>
          <h3>This is a permanant action and cannot be undone</h3>
        </Content>
        </ModalCardBody>
        <ModalCardFooter>
          <Button onClick={this.props.delete} isColor='danger'>Delete</Button>
          <Button onClick={this.toggleWarning}>Cancel</Button>          
        </ModalCardFooter>
</ModalCard>
</Modal>
</div>
    );
  }
}

function imageHandler() {
  var range = this.quill.getSelection();
  //TODO: use a Modal instead of ugly prompt
  var value = prompt('What is the image URL');
  if(value)
    this.quill.insertEmbed(range.index, 'image', value, "user");
}

Editor.modules = {
  ImageResize: {},
  toolbar: {
    container: "#toolbar",
    handlers: {
      image: imageHandler
    }
  },
  clipboard: {
    matchVisual: false,
  }
};


export default Editor;